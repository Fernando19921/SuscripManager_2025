import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfaces compartidas entre servicio y componente
export interface Subscriber {
  id: number;
  name: string;
  city: string;
  colonyId: number;
}

export interface Package {
  id: number;
  name: string;
  description: string;
  price: number;
  services: string[];
  promotionMonths: number;
}

export interface Promotion {
  id: number;
  description: string;
  discountType: 'percentage' | 'fixed';
  value: number;
  autoApplied: boolean;
  scope: 'package' | 'city' | 'colony' | 'service';
}

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  // URLs base de la API (reemplazar)
  private packagesUrl = 'https://tu-api.com/api/packages';
  private subscribersUrl = 'https://tu-api.com/api/subscribers';
  private promotionsUrl = 'https://tu-api.com/api/promotions';

  constructor(private http: HttpClient) {}

  // Obtener paquetes disponibles desde API
  getPackages(): Observable<Package[]> {
    return this.http.get<Package[]>(this.packagesUrl);
  }

  // Obtener suscriptores desde API
  getSubscribers(): Observable<Subscriber[]> {
    return this.http.get<Subscriber[]>(this.subscribersUrl);
  }

  // Obtener promociones aplicables según suscriptor y paquete
  getPromotions(packageId: number, subscriberId: number): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(`${this.promotionsUrl}?packageId=${packageId}&subscriberId=${subscriberId}`);
  }
}
