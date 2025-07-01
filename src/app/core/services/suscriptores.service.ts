import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { reporteSuscriptor, suscriptor } from '../../suscriptor/interface/suscriptor-interface';

@Injectable({
  providedIn: 'root'
})
export class SuscriptoresService {
  private apiUrl: string =  'http://localhost:5222/api/SuscriptorDatas';

  //http://localhost:5222/api/SuscriptorDatas/reporte-suscriptor/1


  constructor(private http:HttpClient) { }

  public getSuscriptores():Observable<suscriptor[]>{
    return this.http.get<any[]>(`${this.apiUrl}/suscriptorInfo`)
    .pipe(
      map(items => items.map(item => ({
        id: item.suscriptor_id,
        nombre: item.nombre,
        paquete: item.paquete ?? item.Paquete,
        promocion: item.promocion ?? item.Promocion,
        suscriptor_id: item.suscriptor_id,
        vigente: item.vigente ?? item.Vigente
      }) as suscriptor)),
      catchError(()=>of([]))
    )
  }

  searchSuscriptorById(id:number):Observable<reporteSuscriptor[] | null>{
    return this.http.get<any[]>(`${this.apiUrl}/reporte-suscriptor/${id}`)
    .pipe(
      map(items => items.map(item => ({
        nombre: item.nombre,
        correo: item.correo,
        colonia: item.colonia ?? item.Colonia,
        nombre_paquete: item.nombre_paquete,
        servicios: item.servicios ?? item.Servicios,
        descripcion: item.descripcion,
        vigente: item.vigente ?? item.Vigente,
        precio: item.precio,
        conDescuento: item.conDescuento ?? item.ConDescuento
      }) as reporteSuscriptor)),
      catchError(()=>of([]))
    )
  }

  searchByTerm(term: string) {
  const normalizedTerm = term.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  return this.getSuscriptores().pipe(
    map(suscriptores =>
      suscriptores.filter(s => {
        const normalizedName = s.nombre.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return normalizedName.includes(normalizedTerm);
      })
    ),
    catchError(() => of([]))
  );
}

}
