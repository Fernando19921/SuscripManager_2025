// src/app/pages/deuda-suscriptor/deuda-suscriptor.component.ts
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import jsPDF from 'jspdf';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PackageService, DebtDetail, Subscriber } from '../../core/services/deuda-suscriptor.service';

interface MonthlyPayment {
  month: string;
  amount: number;
}

@Component({
  selector: 'app-deuda-suscriptor',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressBarModule,
  ],
  templateUrl: './deuda-suscriptor.component.html',
  styleUrls: ['./deuda-suscriptor.component.css'],
})
export class DeudaSuscriptorComponent implements OnInit {
  subscribers: Subscriber[] = [];
  debtPackages: DebtDetail[] = [];

  selectedSubscriberId: number | null = null;
  selectedPackageIndex: number | null = null;
  selectedDebt: DebtDetail | null = null;

  calculatedTotal: number | null = null;
  discountPercentage = 0;
  monthlyPayments: MonthlyPayment[] = [];
  postPromotionPayment: number | null = null;
  serviceShare = 0;
  nextMonthName: string = '';

  private monthNames = [
    'Enero','Febrero','Marzo','Abril','Mayo','Junio',
    'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'
  ];

  constructor(
    private packageService: PackageService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadSubscribers();
  }

  private loadSubscribers() {
    this.packageService.getSubscribers().subscribe({
      next: data => {
        this.subscribers = data.filter(
          (item, i, arr) => i === arr.findIndex(s => s.nombre === item.nombre)
        );
        this.cd.detectChanges();
      },
      error: err => console.error('Error al cargar suscriptores:', err)
    });
  }

  onSelectSubscriber() {
    this.resetAll();
    if (!this.selectedSubscriberId) return;
    this.packageService.getDebtBySubscriber(this.selectedSubscriberId).subscribe({
      next: data => {
        this.debtPackages = data.filter(
          (item, i, arr) => i === arr.findIndex(d => d.paquete === item.paquete)
        );
        this.cd.detectChanges();
      },
      error: err => console.error('Error al consultar deuda:', err)
    });
  }

  onSelectPackage() {
    this.resetTotals();
    this.selectedDebt = this.selectedPackageIndex !== null
      ? this.debtPackages[this.selectedPackageIndex]
      : null;
  }

  calculateTotal() {
    this.resetTotals();
    if (!this.selectedDebt) return;

    // 1) Filtrar solo meses con descuento
    const promoMonths = this.selectedDebt.mensualidades
      .filter(m => m.precioAplicado < m.precioSinDescuento);

    // 2) Totales promo
    const totalBase = promoMonths.reduce((sum, m) => sum + m.precioSinDescuento, 0);
    const totalPromo = promoMonths.reduce((sum, m) => sum + m.precioAplicado, 0);

    this.calculatedTotal = totalPromo;
    const rawDisc = ((totalBase - totalPromo) / totalBase) * 100;
    this.discountPercentage = Math.max(1, Math.round(rawDisc));

    // 3) Generar tarjetas de promo
    this.monthlyPayments = promoMonths.map(m => ({ month: m.mes, amount: m.precioAplicado }));

    // 4) Inferir siguiente mes exacto tras el último promocionado
    if (promoMonths.length) {
      const lastRaw = promoMonths[promoMonths.length - 1].mes.toLowerCase();
      // buscar índice comprobando inclusión
      const idx = this.monthNames.findIndex(m => lastRaw.includes(m.toLowerCase()));
      const safeIdx = idx >= 0 ? idx : this.monthNames.findIndex((_, i) => i === new Date().getMonth());
      this.nextMonthName = this.monthNames[(safeIdx + 1) % 12];
      // precio normal = sin descuento del primer mes promo
      this.postPromotionPayment = promoMonths[0].precioSinDescuento;
    }

    // 5) compartir servicio
    this.serviceShare = promoMonths.length && this.selectedDebt.servicios.length
      ? +(promoMonths[0].precioAplicado / this.selectedDebt.servicios.length).toFixed(2)
      : 0;
  }

  exportToPDF() {
    if (this.calculatedTotal === null || !this.selectedDebt) return;
    const doc = new jsPDF(); doc.setFontSize(14);
    const sub = this.subscribers.find(s => s.suscriptor_id === this.selectedSubscriberId);

    doc.text('Resumen de Deuda', 10, 10);
    doc.text(`Suscriptor: ${sub?.nombre}`, 10, 20);
    doc.text(`Colonia: ${this.selectedDebt.colonia}`, 10, 30);
    doc.text(`Paquete: ${this.selectedDebt.paquete}`, 10, 40);
    doc.text(`Promoción: ${this.selectedDebt.promocion}`, 10, 50);
    doc.text(`Precio base: $${this.selectedDebt.mensualidades[0].precioSinDescuento}`, 10, 60);
    doc.text(`Total a pagar: $${this.calculatedTotal}`, 10, 70);

    doc.text('Mensualidades promocionadas:', 10, 85);
    let y = 95;
    this.monthlyPayments.forEach(p => { doc.text(`${p.month}: $${p.amount}`, 10, y); y += 10; });
    doc.save(`deuda-${sub?.nombre}.pdf`);
  }

  private resetAll() {
    this.selectedPackageIndex = null; this.selectedDebt = null; this.debtPackages = [];
    this.resetTotals();
  }
  private resetTotals() {
    this.calculatedTotal = null; this.discountPercentage = 0;
    this.monthlyPayments = []; this.postPromotionPayment = null;
    this.nextMonthName = ''; this.serviceShare = 0;
  }
}
