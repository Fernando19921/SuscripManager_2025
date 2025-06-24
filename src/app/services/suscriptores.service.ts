import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SuscriptoresService {
  private apiUrl: string = 'assets/data/infoSuscriptores.json';

  constructor(private http:HttpClient) { }


}
