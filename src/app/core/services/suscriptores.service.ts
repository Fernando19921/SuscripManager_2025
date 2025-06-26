import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { suscriptor } from '../../suscriptor/interface/suscriptor-interface';

@Injectable({
  providedIn: 'root'
})
export class SuscriptoresService {
  private apiUrl: string =  'assets/data/infoSuscriptores.json';


  constructor(private http:HttpClient) { }

  public getSuscriptores():Observable<suscriptor[]>{
    return this.http.get<suscriptor[]>(this.apiUrl)
    .pipe(
      catchError(()=>of([]))
    )
  }

  searchSuscriptorById(id:number):Observable<suscriptor | null>{
    return this.getSuscriptores()
    .pipe(
      map((suscriptores)=>suscriptores.find(s=>s.id===id)||null),
      catchError(()=>of())
    )
  }
}
