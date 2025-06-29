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

  // Selecciones
  selectedSubscriberId: number | null = null;
  selectedPackageId: number | null = null;
  selectedPackage: Package | null = null;

  // Promociones aplicadas
  appliedPromotions: Promotion[] = [];

  // Totales y desglose
  calculatedTotal: number | null = null;
  discountPercentage: number = 0;
  promotionMonths = 0;
  monthlyPayments: number[] = [];
  postPromotionPayment: number | null = null;
  serviceShare: number = 0;

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
      // ...otros paquetes
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
    // Simulación de promociones según paquete, ciudad, colonia o servicio
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
      // ...más promociones
    ];
    // Mantener solo las automáticas al inicio
    this.appliedPromotions = this.promotions.filter(p => p.autoApplied);
  }

  calculateTotal() {
    if (!this.selectedPackage) return;

    const base = this.selectedPackage.price;
    let total = base;

    // Aplica todas las promociones activas
    this.appliedPromotions.forEach(promo => {
      total -= promo.discountType === 'percentage'
        ? (promo.value / 100) * base
        : promo.value;
    });

    // Total redondeado y no negativo
    this.calculatedTotal = Math.max(0, Math.round(total));

    // Cálculo porcentaje ahorro
    this.discountPercentage = Math.round(((base - this.calculatedTotal) / base) * 100);

    // Determina cuántos meses de promoción (máx. 6)
    this.promotionMonths = Math.min(this.selectedPackage.promotionMonths, 6);

    // Calcula el pago mensual durante la promoción
    const share = +(this.calculatedTotal / this.promotionMonths).toFixed(2);
    this.monthlyPayments = Array(this.promotionMonths).fill(share);

    // Pago normal tras la promoción
    this.postPromotionPayment = base;

    // Desglose por servicio
    this.serviceShare = +(share / this.selectedPackage.services.length).toFixed(2);
  }

  exportToPDF() {
    if (this.calculatedTotal === null) return;
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text('Resumen de Deuda', 10, 10);
    doc.text(`Suscriptor: ${ this.subscribers.find(s => s.id === this.selectedSubscriberId)?.name }`, 10, 20);
    doc.text(`Paquete: ${ this.selectedPackage?.name }`, 10, 30);
    doc.text(`Precio base: $${ this.selectedPackage?.price }`, 10, 40);
    doc.text('Promociones aplicadas:', 10, 50);
    let y = 60;
    this.appliedPromotions.forEach(p => {
      doc.text(`- ${p.description}`, 12, y);
      y += 8;
    });
    doc.text(`Total a pagar: $${ this.calculatedTotal }`, 10, y + 10);
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
  }
}
