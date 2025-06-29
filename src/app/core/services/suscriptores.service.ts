import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { reporteSuscriptor, suscriptor } from '../../suscriptor/interface/suscriptor-interface';

@Injectable({
  providedIn: 'root'
})
export class SuscriptoresService {
  private apiUrl: string =  'http://localhost:5222/api/SuscriptorDatas';
  //http://localhost:5222/api/SuscriptorDatas/reporte-suscriptor/1


  constructor(private http:HttpClient) { }

  public getSuscriptores():Observable<suscriptor[]>{
    return this.http.get<suscriptor[]>(`${this.apiUrl}/suscriptorInfo`)
    .pipe(
      catchError(()=>of([]))
    )
  }

  searchSuscriptorById(id:number):Observable<reporteSuscriptor[] | null>{
    return this.http.get<reporteSuscriptor[]>(`${this.apiUrl}/reporte-suscriptor/${id}`)
    .pipe(
      catchError(()=>of([]))
    )
  }
}
