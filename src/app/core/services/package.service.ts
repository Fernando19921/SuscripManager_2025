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

export interface MonthlyDebt {
  Mes: string;
  PrecioSinDescuento: number;
  PrecioAplicado: number;
  EstadoPromocion: string;
}

export interface DebtDetail {
  nombre: string;
  Colonia: string;
  Paquete: string;
  Servicios: string[];
  Promocion: string;
  mensualidades: MonthlyDebt[];
}

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  // URL base de la API local
  private apiBase = 'http://localhost:5222/api';

  constructor(private http: HttpClient) {}

  // Obtener paquetes disponibles desde API
  getPackages(): Observable<Package[]> {
    return this.http.get<Package[]>(`${this.apiBase}/PaquetesDatas`);
  }

  // Obtener suscriptores con detalle
  getSubscribers(): Observable<Subscriber[]> {
    return this.http.get<Subscriber[]>(`${this.apiBase}/SuscriptorDatas/suscriptorInfo`);
  }

  // Obtener reporte de un suscriptor
  getSubscriberReport(id: number): Observable<DebtDetail[]> {
    return this.http.get<DebtDetail[]>(`${this.apiBase}/SuscriptorDatas/reporte-suscriptor/${id}`);
  }

  // Obtener deuda calculada por suscriptor
  getDebtBySubscriber(id: number): Observable<DebtDetail[]> {
    return this.http.get<DebtDetail[]>(`${this.apiBase}/SuscriptorDatas/reporte-suscriptor/${id}/deuda`);
  }
}
