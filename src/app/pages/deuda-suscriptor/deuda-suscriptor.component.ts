import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule} from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


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
    MatProgressSpinnerModule
  ],
  templateUrl: './deuda-suscriptor.component.html',
  styleUrls: ['./deuda-suscriptor.component.css'],
})
export class DeudaSuscriptorComponent implements OnInit {
  // Datos
  subscribers: Subscriber[] = [];
  packages: Package[] = [];
  promotions: Promotion[] = [];

  // Estados de selección
  selectedSubscriberId: number | null = null;
  selectedPackageId: number | null = null;

  // Objetos completos
  selectedPackage: Package | null = null;

  // Promos aplicadas
  selectedPromotions: number[] = [];

  // Flags de carga / error
  loadingPromos = false;
  errorPromos: string | null = null;

  // Resultado
  total = 0;

  ngOnInit() {
    this.loadSubscribers();
    this.loadPackages();
  }

  private loadSubscribers() {
    // TODO: Reemplazar simulación por llamada real:
    // this.subscriberService.getAll().subscribe(...)
    this.subscribers = [
      { id: 1, name: 'Juan Pérez' },
      { id: 2, name: 'María López' },
    ];
  }

  private loadPackages() {
    // TODO: Reemplazar simulación por llamada real:
    // this.packageService.getPackages().subscribe(...)
    this.packages = [
      { id: 1, name: 'Paquete A', description: 'Básico', price: 199, services: ['Internet 20MB', 'Llamadas locales'] },
      { id: 2, name: 'Paquete B', description: 'Avanzado', price: 349, services: ['Internet 100MB', 'TV básica', 'Llamadas ilimitadas'] },
    ];
  }

  onSelectSubscriber() {
    // Reiniciar todo al cambiar de suscriptor
    this.selectedPackageId = null;
    this.selectedPackage = null;
    this.promotions = [];
    this.selectedPromotions = [];
    this.total = 0;
  }

  onSelectPackage() {
    this.selectedPackage = this.packages.find(p => p.id === this.selectedPackageId) ?? null;
    this.loadPromotions();
  }

  private loadPromotions() {
    if (!this.selectedPackage) return;

    this.loadingPromos = true;
    this.errorPromos = null;

    // TODO: Consumir API real cuando esté lista:
    // this.promoService.getPromos(this.selectedPackageId!, coloniaId, this.selectedSubscriberId!).subscribe(...)
    setTimeout(() => {
      // Simulación de respuesta
      this.promotions = [
        { id: 1, description: '10% por ser nuevo suscriptor', discountType: 'percentage', value: 10, autoApplied: true },
        { id: 2, description: '$50 por referido', discountType: 'fixed', value: 50, autoApplied: false },
      ];
      // Aplica autoPromos
      this.selectedPromotions = this.promotions.filter(p => p.autoApplied).map(p => p.id);
      this.loadingPromos = false;
      this.calculateTotal();
    }, 800);
  }

  onTogglePromotion(promo: Promotion) {
    const idx = this.selectedPromotions.indexOf(promo.id);
    if (idx >= 0) {
      this.selectedPromotions.splice(idx, 1);
    } else {
      this.selectedPromotions.push(promo.id);
    }
    this.calculateTotal();
  }

  calculateTotal() {
    if (!this.selectedPackage) {
      this.total = 0;
      return;
    }
    let t = this.selectedPackage.price;
    for (const promo of this.promotions.filter(p => this.selectedPromotions.includes(p.id))) {
      if (promo.discountType === 'percentage') {
        t -= (promo.value / 100) * this.selectedPackage.price;
      } else {
        t -= promo.value;
      }
    }
    this.total = Math.max(0, Math.round(t));
  }

  exportToPDF() {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text('Resumen de Deuda', 10, 10);
    doc.text(`Suscriptor: ${this.subscribers.find(s => s.id === this.selectedSubscriberId)?.name}`, 10, 20);
    doc.text(`Paquete: ${this.selectedPackage?.name}`, 10, 30);
    doc.text(`Precio base: $${this.selectedPackage?.price}`, 10, 40);
    doc.text('Promociones:', 10, 50);
    let y = 60;
    this.promotions
      .filter(p => this.selectedPromotions.includes(p.id))
      .forEach(p => {
        doc.text(`- ${p.description}`, 12, y);
        y += 8;
      });
    doc.text(`Total a pagar: $${this.total}`, 10, y + 10);
    doc.save('deuda-suscriptor.pdf');
  }
}
