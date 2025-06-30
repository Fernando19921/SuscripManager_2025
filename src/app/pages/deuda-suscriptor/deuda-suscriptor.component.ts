import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import jsPDF from 'jspdf';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';

interface Subscriber {
  id: number;
  name: string;
  city: string;
  colonyId: number;
}

interface Package {
  id: number;
  name: string;
  description: string;
  price: number;
  services: string[];
  promotionMonths: number;
}

interface Promotion {
  id: number;
  description: string;
  discountType: 'percentage' | 'fixed';
  value: number;
  autoApplied: boolean;
  scope: 'package' | 'city' | 'colony' | 'service';
}

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
  // Datos simulados
  subscribers: Subscriber[] = [];
  packages: Package[] = [];
  promotions: Promotion[] = [];

  // Promociones aplicadas
  appliedPromotions: Promotion[] = [];

  // Selecciones
  selectedSubscriberId: number | null = null;
  selectedPackageId: number | null = null;
  selectedPackage: Package | null = null;

  // Totales y desglose
  calculatedTotal: number | null = null;
  discountPercentage = 0;
  promotionMonths = 0;
  monthlyPayments: MonthlyPayment[] = [];
  postPromotionPayment: number | null = null;
  serviceShare = 0;

  // Mes siguiente después de la promoción
  public nextMonthName: string = '';

  private monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril',
    'Mayo', 'Junio', 'Julio', 'Agosto',
    'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  ngOnInit() {
    this.loadSubscribers();
    this.loadPackages();
  }

  private loadSubscribers() {
    this.subscribers = [
      { id: 1, name: 'Juan Pérez', city: 'Ciudad MX', colonyId: 1 },
      { id: 2, name: 'María López', city: 'Ciudad MX', colonyId: 2 },
      // ...otros suscriptores
    ];
  }

  private loadPackages() {
    this.packages = [
      {
        id: 1,
        name: 'Básico TV',
        description: 'Paquete básico de televisión',
        price: 199.99,
        services: ['Televisión'],
        promotionMonths: 3
      },
      {
        id: 2,
        name: 'Internet 100Mbps',
        description: 'Internet de 100 megas',
        price: 349,
        services: ['Internet'],
        promotionMonths: 4
      },
      {
        id: 3,
        name: 'Paquete Expirado',
        description: 'Promoción ya expirada',
        price: 299,
        services: ['Internet', 'TV'],
        promotionMonths: 0  // sin meses de promoción
      }
    ];
  }

  onSelectSubscriber() {
    this.resetAll();
  }

  onSelectPackage() {
    this.selectedPackage = this.packages.find(p => p.id === this.selectedPackageId) ?? null;
    this.resetTotals();
    this.loadPromotions();
  }

  private loadPromotions() {
    if (!this.selectedPackage || !this.selectedSubscriberId) return;

    // Si promotionMonths es 0, la promo expiró
    if (this.selectedPackage.promotionMonths === 0) {
      this.promotions = [];
      this.appliedPromotions = [];
      return;
    }

    this.promotions = [
      {
        id: 1,
        description: '10% por ser nuevo suscriptor',
        discountType: 'percentage',
        value: 10,
        autoApplied: true,
        scope: 'package'
      },
      {
        id: 3,
        description: '20% estudiantes',
        discountType: 'percentage',
        value: 20,
        autoApplied: false,
        scope: 'city'
      }
    ];
    this.appliedPromotions = this.promotions.filter(p => p.autoApplied);
  }

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

    // Pago por mes de promoción
    const share = this.promotionMonths > 0
      ? +(this.calculatedTotal / this.promotionMonths).toFixed(2)
      : 0;

    // Generar array con nombre de mes + cantidad
    const startMonthIndex = new Date().getMonth();
    this.monthlyPayments = [];
    for (let i = 0; i < this.promotionMonths; i++) {
      const monthName = this.monthNames[(startMonthIndex + i) % 12];
      this.monthlyPayments.push({ month: monthName, amount: share });
    }

    // Nombre del mes que sigue después de la promo
    this.nextMonthName = this.monthNames[(startMonthIndex + this.promotionMonths) % 12];

    this.postPromotionPayment = base;
    this.serviceShare = this.promotionMonths > 0
      ? +(share / this.selectedPackage.services.length).toFixed(2)
      : 0;
  }

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

  private resetAll() {
    this.selectedPackageId = null;
    this.selectedPackage = null;
    this.promotions = [];
    this.appliedPromotions = [];
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
