import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import jsPDF from 'jspdf';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
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
    MatProgressBarModule,
    MatChipsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './deuda-suscriptor.component.html',
  styleUrls: ['./deuda-suscriptor.component.css'],
})
export class DeudaSuscriptorComponent implements OnInit {
  // Datos obtenidos desde el servicio
  subscribers: Subscriber[] = [];
  debtPackages: DebtDetail[] = [];

  // Selecciones actuales
  selectedSubscriberId: number | null = null;
  selectedPackageIndex: number | null = null;
  selectedDebt: DebtDetail | null = null;

  // Resultados del cálculo de deuda
  calculatedTotal: number | null = null;
  discountPercentage = 0;
  promotionMonths = 0;
  monthlyPayments: MonthlyPayment[] = [];
  postPromotionPayment: number | null = null;
  serviceShare = 0;
  nextMonthName: string = '';

  // Nombres de meses para desglose mensual
  private monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril',
    'Mayo', 'Junio', 'Julio', 'Agosto',
    'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  constructor(private packageService: PackageService) {}

  ngOnInit() {
    this.loadSubscribers();
  }

  // Cargar suscriptores desde el servicio
  private loadSubscribers() {
    this.packageService.getSubscribers().subscribe({
      next: (data: Subscriber[]) => this.subscribers = data,
      error: (err: unknown) => console.error('Error al cargar suscriptores:', err)
    });
  }



  // Cambiar de suscriptor: cargar paquetes con deuda
  onSelectSubscriber() {
    this.resetAll();
    if (this.selectedSubscriberId) {
      this.packageService.getDebtBySubscriber(this.selectedSubscriberId).subscribe({
        next: (data: DebtDetail[]) => {
          this.debtPackages = data;
        },
        error: (err: unknown) => console.error('Error al cargar deuda:', err)
      });
    }
  }

  // Al seleccionar paquete se calculan los totales
  onSelectPackage() {
    this.selectedDebt = this.selectedPackageIndex !== null ? this.debtPackages[this.selectedPackageIndex] : null;
    this.calculateTotal();
  }

  // Calcular el total a pagar basándose en la deuda recibida
  calculateTotal() {
    this.resetTotals();
    if (!this.selectedDebt) return;

    const baseTotal = this.selectedDebt.mensualidades.reduce((a, m) => a + m.PrecioSinDescuento, 0);
    const appliedTotal = this.selectedDebt.mensualidades.reduce((a, m) => a + m.PrecioAplicado, 0);
    this.calculatedTotal = appliedTotal;
    this.discountPercentage = Math.round(((baseTotal - appliedTotal) / baseTotal) * 100);
    this.promotionMonths = this.selectedDebt.mensualidades.length;
    this.monthlyPayments = this.selectedDebt.mensualidades.map(m => ({ month: m.Mes, amount: m.PrecioAplicado }));
    const startMonthIndex = new Date().getMonth();
    this.nextMonthName = this.monthNames[(startMonthIndex + this.promotionMonths) % 12];
    this.postPromotionPayment = this.selectedDebt.mensualidades[0].PrecioSinDescuento;
    this.serviceShare = this.selectedDebt.Servicios.length > 0 ? +(this.selectedDebt.mensualidades[0].PrecioAplicado / this.selectedDebt.Servicios.length).toFixed(2) : 0;
  }

  // Generar PDF con resumen
  exportToPDF() {
    if (this.calculatedTotal === null) return;
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text('Resumen de Deuda', 10, 10);
    doc.text(`Suscriptor: ${this.subscribers.find(s => s.id === this.selectedSubscriberId)?.name}`, 10, 20);
    doc.text(`Paquete: ${this.selectedDebt?.Paquete}`, 10, 30);
    doc.text(`Precio base: $${this.selectedDebt?.mensualidades[0].PrecioSinDescuento}`, 10, 40);
    doc.text(`Total a pagar: $${this.calculatedTotal}`, 10, 50);
    doc.save('deuda-suscriptor.pdf');
  }

  // Limpiar selecciones cuando cambia suscriptor
  private resetAll() {
    this.selectedPackageIndex = null;
    this.selectedDebt = null;
    this.debtPackages = [];
    this.resetTotals();
  }

  // Reiniciar todos los totales calculados
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
