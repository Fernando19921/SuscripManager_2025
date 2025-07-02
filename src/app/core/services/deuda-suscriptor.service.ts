import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Modelo de suscriptor
export interface Subscriber {
  suscriptor_id: number;
  nombre: string;
  city: string;
  colonyId: number;
}

// Modelo de mensualidad
export interface MonthlyDebt {
  mes: string;
  precioSinDescuento: number;
  precioAplicado: number;
  estadoPromocion: string;
}

// Modelo de detalle de deuda
export interface DebtDetail {
  nombre: string;
  colonia: string;
  paquete: string;
  servicios: string[];
  promocion: string;
  mensualidades: MonthlyDebt[];
}


@Injectable({
  providedIn: 'root'
})
export class PackageService {
  private apiBase = 'http://localhost:5222/api'; // Cambia si tu API está en otro puerto o ruta

  constructor(private http: HttpClient) {}

  // Obtiene todos los suscriptores
  getSubscribers(): Observable<Subscriber[]> {
    return this.http.get<Subscriber[]>(`${this.apiBase}/SuscriptorDatas/suscriptorInfo`);
  }

  // Obtiene la deuda de un suscriptor por su ID
  getDebtBySubscriber(id: number): Observable<DebtDetail[]> {
    return this.http.get<DebtDetail[]>(`${this.apiBase}/SuscriptorDatas/reporte-suscriptor/${id}/deuda`);
  }
}
