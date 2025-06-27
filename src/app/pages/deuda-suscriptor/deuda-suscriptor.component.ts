import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { jsPDF } from 'jspdf';




export interface Package {
  id: number;
  name: string;
  description: string;
  price: number;
  services: string[];
}

export interface Promotion {
  id: number;
  description: string;
  discountType: 'percentage' | 'fixed';
  value: number;
  autoApplied: boolean;
}

@Component({
  selector: 'app-deuda-suscriptor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './deuda-suscriptor.component.html',
  styleUrls: ['./deuda-suscriptor.component.css']
})
export class DeudaSuscriptorComponent implements OnInit {
  packages: Package[] = [];
  promotions: Promotion[] = [];

  selectedPackageId: number | null = null;
  selectedPackage: Package | null = null;

  selectedPromotions: number[] = [];

  loadingPromos = false;
  errorPromos: string | null = null;

  total = 0;

  ngOnInit() {
    this.loadPackages();
  }

  loadPackages() {
    // Simular datos de paquetes
    this.packages = [
      {
        id: 1,
        name: 'Paquete A',
        description: 'Incluye internet básico y llamadas locales.',
        price: 199,
        services: ['Internet 20MB', 'Llamadas locales']
      },
      {
        id: 2,
        name: 'Paquete B',
        description: 'Internet rápido y llamadas ilimitadas.',
        price: 349,
        services: ['Internet 100MB', 'Llamadas ilimitadas', 'TV básica']
      }
    ];
  }

  onSelectPackage() {
    this.selectedPackage =
      this.packages.find(p => p.id === this.selectedPackageId) ?? null;
    this.loadPromotions(); // al cambiar paquete, cargar promos
  }

  loadPromotions() {
    this.loadingPromos = true;
    this.errorPromos = null;

    // Simular delay y promociones
    setTimeout(() => {
      if (!this.selectedPackage) {
        this.promotions = [];
        return;
      }

      this.promotions = [
        {
          id: 1,
          description: '10% de descuento por puntualidad',
          discountType: 'percentage',
          value: 10,
          autoApplied: true
        },
        {
          id: 2,
          description: '$50 de descuento por recomendación',
          discountType: 'fixed',
          value: 50,
          autoApplied: false
        }
      ];

      // Marcar promociones autoAplicadas como seleccionadas
      this.selectedPromotions = this.promotions
        .filter(p => p.autoApplied)
        .map(p => p.id);

      this.loadingPromos = false;
      this.calculateTotal();
    }, 1000);

    // Futuro: consumir de API
    /*
    this.promoService.getPromos(packageId, coloniaId, suscriptorId).subscribe(...)
    */
  }

  onTogglePromotion(promo: Promotion) {
    const index = this.selectedPromotions.indexOf(promo.id);
    if (index > -1) {
      this.selectedPromotions.splice(index, 1);
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

    let total = this.selectedPackage.price;

    const appliedPromos = this.promotions.filter(p =>
      this.selectedPromotions.includes(p.id)
    );

    for (const promo of appliedPromos) {
      if (promo.discountType === 'percentage') {
        total -= (promo.value / 100) * this.selectedPackage.price;
      } else if (promo.discountType === 'fixed') {
        total -= promo.value;
      }
    }

    this.total = total < 0 ? 0 : Math.round(total);
  }

  exportToPDF() {
    const doc = new jsPDF();
    doc.setFontSize(12);

    doc.text('Resumen de Deuda del Suscriptor', 10, 10);
    doc.text(`Suscriptor: [nombre aquí]`, 10, 20);
    doc.text(`Paquete: ${this.selectedPackage?.name}`, 10, 30);
    doc.text(`Precio base: $${this.selectedPackage?.price}`, 10, 40);

    doc.text(`Promociones aplicadas:`, 10, 50);
    let y = 60;
    this.promotions
      .filter(p => this.selectedPromotions.includes(p.id))
      .forEach(promo => {
        doc.text(`- ${promo.description}`, 12, y);
        y += 10;
      });

    doc.text(`Total a pagar: $${this.total}`, 10, y + 10);
    doc.save('resultado-deuda.pdf');
  }
}
