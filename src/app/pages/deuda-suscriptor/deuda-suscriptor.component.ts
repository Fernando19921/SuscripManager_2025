import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import jsPDF from 'jspdf';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { PackageService, Package, Subscriber, Promotion } from '../../core/services/package.service';

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
  packages: Package[] = [];
  promotions: Promotion[] = [];
  appliedPromotions: Promotion[] = [];

  // Selecciones actuales
  selectedSubscriberId: number | null = null;
  selectedPackageId: number | null = null;
  selectedPackage: Package | null = null;

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
    this.loadPackages();
  }

  // Cargar suscriptores desde el servicio
  private loadSubscribers() {
    this.packageService.getSubscribers().subscribe({
      next: (data: Subscriber[]) => this.subscribers = data,
      error: (err: unknown) => console.error('Error al cargar suscriptores:', err)
    });
  }

  // Cargar paquetes desde el servicio
  private loadPackages() {
    this.packageService.getPackages().subscribe({
      next: (data: Package[]) => this.packages = data,
      error: (err: unknown) => console.error('Error al cargar paquetes:', err)
    });
  }

  // Cambiar de suscriptor limpia las selecciones
  onSelectSubscriber() {
    this.resetAll();
  }

  // Al seleccionar paquete, cargar promociones desde API
  onSelectPackage() {
    this.selectedPackage = this.packages.find(p => p.id === this.selectedPackageId) ?? null;
    this.resetTotals();

    if (this.selectedPackage && this.selectedSubscriberId) {
      this.packageService.getPromotions(this.selectedPackage.id, this.selectedSubscriberId).subscribe({
        next: (promos: Promotion[]) => {
          this.promotions = promos;
          this.appliedPromotions = promos.filter(p => p.autoApplied);
        },
        error: (err: unknown) => console.error('Error al cargar promociones:', err)
      });
    }
  }

  // Calcular el total a pagar, aplicar promociones y dividir en meses
  calculateTotal() {
    if (!this.selectedPackage) return;

    const base = this.selectedPackage.price;
    let total = base;

    this.appliedPromotions.forEach(promo => {
      total -= promo.discountType === 'percentage'
        ? (promo.value / 100) * base
        : promo.value;
    });

    this.calculatedTotal = Math.max(0, Math.round(total));
    this.discountPercentage = Math.round(((base - this.calculatedTotal) / base) * 100);
    this.promotionMonths = Math.min(this.selectedPackage.promotionMonths, 12);

    const share = this.promotionMonths > 0
      ? +(this.calculatedTotal / this.promotionMonths).toFixed(2)
      : 0;

    // Generar lista de pagos mensuales con nombre del mes
    const startMonthIndex = new Date().getMonth();
    this.monthlyPayments = [];
    for (let i = 0; i < this.promotionMonths; i++) {
      const monthName = this.monthNames[(startMonthIndex + i) % 12];
      this.monthlyPayments.push({ month: monthName, amount: share });
    }

    this.nextMonthName = this.monthNames[(startMonthIndex + this.promotionMonths) % 12];
    this.postPromotionPayment = base;
    this.serviceShare = this.promotionMonths > 0
      ? +(share / this.selectedPackage.services.length).toFixed(2)
      : 0;
  }

  // Generar PDF con resumen
  exportToPDF() {
    if (this.calculatedTotal === null) return;
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text('Resumen de Deuda', 10, 10);
    doc.text(`Suscriptor: ${this.subscribers.find(s => s.id === this.selectedSubscriberId)?.name}`, 10, 20);
    doc.text(`Paquete: ${this.selectedPackage?.name}`, 10, 30);
    doc.text(`Precio base: $${this.selectedPackage?.price}`, 10, 40);
    doc.text('Promociones aplicadas:', 10, 50);
    let y = 60;
    this.appliedPromotions.forEach(p => {
      doc.text(`- ${p.description}`, 12, y);
      y += 8;
    });
    doc.text(`Total a pagar: $${this.calculatedTotal}`, 10, y + 10);
    doc.save('deuda-suscriptor.pdf');
  }

  // Limpiar selecciones cuando cambia suscriptor
  private resetAll() {
    this.selectedPackageId = null;
    this.selectedPackage = null;
    this.promotions = [];
    this.appliedPromotions = [];
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
