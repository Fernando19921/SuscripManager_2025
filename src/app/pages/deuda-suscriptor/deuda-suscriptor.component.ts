import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import jsPDF from 'jspdf';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';

interface Subscriber {
  id: number;
  name: string;
}

interface Package {
  id: number;
  name: string;
  description: string;
  price: number;
  services: string[];
}

interface Promotion {
  id: number;
  description: string;
  discountType: 'percentage' | 'fixed';
  value: number;
  autoApplied: boolean;
}

@Component({
  selector: 'app-deuda-suscriptor',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatChipsModule
  ],
   schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  templateUrl: './deuda-suscriptor.component.html',
  styleUrls: ['./deuda-suscriptor.component.css'],
})
export class DeudaSuscriptorComponent implements OnInit {
  // Datos simulados
  subscribers: Subscriber[] = [];
  packages: Package[] = [];
  promotions: Promotion[] = [];

  // Estados de selección
  selectedSubscriberId: number | null = null;
  selectedPackageId: number | null = null;

  // Objeto completo del paquete elegido
  selectedPackage: Package | null = null;

  // Promociones aplicadas
  selectedPromotions: number[] = [];

  // Flags de carga / error
  loadingPromos = false;
  errorPromos: string | null = null;

  // Totales y desglose mensual
  calculatedTotal: number | null = null;
  discountPercentage: number = 0;
  monthlyPayments: number[] = [];
  fourthMonthPayment: number | null = null;

  ngOnInit() {
    this.loadSubscribers();
    this.loadPackages();
  }

  private loadSubscribers() {
    this.subscribers = [
      { id: 1, name: 'Juan Pérez' },
      { id: 2, name: 'María López' },
    ];
  }

  private loadPackages() {
    this.packages = [
      {
        id: 1,
        name: 'Paquete A',
        description: 'Básico',
        price: 199,
        services: ['Internet 20MB', 'Llamadas locales'],
      },
      {
        id: 2,
        name: 'Paquete B',
        description: 'Avanzado',
        price: 349,
        services: ['Internet 100MB', 'TV básica', 'Llamadas ilimitadas'],
      },
    ];
  }

  onSelectSubscriber() {
    this.resetAll();
  }

  onSelectPackage() {
    this.selectedPackage = this.packages.find(p => p.id === this.selectedPackageId) ?? null;
    this.selectedPromotions = [];
    this.calculatedTotal = null;
    this.monthlyPayments = [];
    this.fourthMonthPayment = null;
    this.discountPercentage = 0;
    this.loadPromotions();
  }

  private loadPromotions() {
    if (!this.selectedPackage) return;
    this.loadingPromos = true;
    setTimeout(() => {
      this.promotions = [
        { id: 1, description: '10% por ser nuevo suscriptor', discountType: 'percentage', value: 10, autoApplied: true },
        { id: 2, description: '20% por referido', discountType: 'fixed', value: 50, autoApplied: false }
      ];
      this.selectedPromotions = this.promotions.filter(p => p.autoApplied).map(p => p.id);
      this.loadingPromos = false;
    }, 800);
  }

  onTogglePromotion(promo: Promotion) {
    const idx = this.selectedPromotions.indexOf(promo.id);
    if (idx >= 0) this.selectedPromotions.splice(idx, 1);
    else this.selectedPromotions.push(promo.id);
  }

  calculateTotal() {
    if (!this.selectedPackage) {
      this.calculatedTotal = null;
      return;
    }
    const base = this.selectedPackage.price;
    let total = base;
    for (const promo of this.promotions.filter(p => this.selectedPromotions.includes(p.id))) {
      total -= promo.discountType === 'percentage'
        ? (promo.value / 100) * base
        : promo.value;
    }
    this.calculatedTotal = Math.max(0, Math.round(total));
    // porcentaje de ahorro
    this.discountPercentage = Math.round(((base - this.calculatedTotal) / base) * 100);
    // pagos mensuales
    const share = +(this.calculatedTotal / 3).toFixed(2);
    this.monthlyPayments = [share, share, share];
    // pago a partir del mes 4 (sin promoción)
    this.fourthMonthPayment = base;
  }

  exportToPDF() {
    if (this.calculatedTotal === null) return;
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text('Resumen de Deuda', 10, 10);
    doc.text(`Suscriptor: ${ this.subscribers.find(s => s.id === this.selectedSubscriberId)?.name }`, 10, 20);
    doc.text(`Paquete: ${ this.selectedPackage?.name }`, 10, 30);
    doc.text(`Precio base: $${ this.selectedPackage?.price }`, 10, 40);
    doc.text('Promociones:', 10, 50);
    let y = 60;
    this.promotions
      .filter(p => this.selectedPromotions.includes(p.id))
      .forEach(p => {
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
    this.selectedPromotions = [];
    this.calculatedTotal = null;
    this.monthlyPayments = [];
    this.fourthMonthPayment = null;
    this.discountPercentage = 0;
  }
}
