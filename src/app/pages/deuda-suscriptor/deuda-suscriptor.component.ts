import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import jsPDF from 'jspdf';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PackageService, DebtDetail, Subscriber } from '../../core/services/package.service';

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
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressBarModule
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
  promotionMonths = 0;
  monthlyPayments: MonthlyPayment[] = [];
  postPromotionPayment: number | null = null;
  serviceShare = 0;
  nextMonthName: string = '';
  autoCalculated = false;

  private monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
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
      next: (data: Subscriber[]) => {
        // Evitar duplicados por nombre (puedes cambiar a ID si es mejor)
        this.subscribers = data.filter(
          (item, index, self) =>
            index === self.findIndex(s => s.nombre === item.nombre)
        );
        console.log('Suscriptores únicos:', this.subscribers);
        this.cd.detectChanges();
      },
      error: (err) => console.error('Error al cargar suscriptores:', err)
    });
  }

  onSelectSubscriber() {
    this.resetAll();
    this.autoCalculated = false;

    if (this.selectedSubscriberId) {
      this.packageService.getDebtBySubscriber(this.selectedSubscriberId).subscribe({
        next: (data) => {
          const sinDuplicados = data.filter(
            (item, index, self) =>
              index === self.findIndex(d => d.paquete === item.paquete)
          );
          this.debtPackages = sinDuplicados;
          this.cd.detectChanges();
        },
        error: (err) => console.error('❌ Error al consultar deuda:', err)
      });
    }
  }

  onSelectPackage() {
    this.selectedDebt = this.selectedPackageIndex !== null
      ? this.debtPackages[this.selectedPackageIndex]
      : null;

    if (this.selectedDebt) {
      this.calculateTotal();
      this.autoCalculated = true;
    }
  }

  calculateTotal() {
    this.resetTotals();
    if (!this.selectedDebt) return;

    const baseTotal = this.selectedDebt.mensualidades.reduce((a, m) => a + m.precioSinDescuento, 0);
    const appliedTotal = this.selectedDebt.mensualidades.reduce((a, m) => a + m.precioAplicado, 0);
    this.calculatedTotal = appliedTotal;

    let rawDiscount = ((baseTotal - appliedTotal) / baseTotal) * 100;
    this.discountPercentage = Math.round(rawDiscount);
    if (this.discountPercentage === 0 && rawDiscount > 0) {
      this.discountPercentage = 1;
    }

    this.promotionMonths = this.selectedDebt.mensualidades.length;
    this.monthlyPayments = this.selectedDebt.mensualidades.map(m => ({
      month: m.mes,
      amount: m.precioAplicado
    }));

    const startMonthIndex = new Date().getMonth();
    this.nextMonthName = this.monthNames[(startMonthIndex + this.promotionMonths) % 12];

    this.postPromotionPayment = this.selectedDebt.mensualidades[0].precioSinDescuento;

    this.serviceShare = this.selectedDebt.servicios.length > 0
      ? +(this.selectedDebt.mensualidades[0].precioAplicado / this.selectedDebt.servicios.length).toFixed(2)
      : 0;
  }

  exportToPDF() {
    if (this.calculatedTotal === null || !this.selectedDebt) return;

    const doc = new jsPDF();
    doc.setFontSize(14);
    const selectedSub = this.subscribers.find(s => s.suscriptor_id === this.selectedSubscriberId);

    doc.text('Resumen de Deuda', 10, 10);
    doc.text(`Suscriptor: ${selectedSub?.nombre}`, 10, 20);
    doc.text(`Colonia: ${this.selectedDebt.colonia}`, 10, 30);
    doc.text(`Paquete: ${this.selectedDebt.paquete}`, 10, 40);
    doc.text(`Promoción: ${this.selectedDebt.promocion}`, 10, 50);
    doc.text(`Precio base mensual: $${this.selectedDebt.mensualidades[0].precioSinDescuento}`, 10, 60);
    doc.text(`Total a pagar: $${this.calculatedTotal}`, 10, 70);

    doc.text('Mensualidades:', 10, 85);
    let y = 95;
    this.monthlyPayments.forEach(p => {
      doc.text(`${p.month}: $${p.amount}`, 10, y);
      y += 10;
    });

    doc.save(`deuda-${selectedSub?.nombre}.pdf`);
  }

  private resetAll() {
    this.selectedPackageIndex = null;
    this.selectedDebt = null;
    this.debtPackages = [];
    this.resetTotals();
  }

  private resetTotals() {
    this.calculatedTotal = null;
    this.discountPercentage = 0;
    this.monthlyPayments = [];
    this.postPromotionPayment = null;
    this.promotionMonths = 0;
    this.serviceShare = 0;
    this.nextMonthName = '';
  }
}
