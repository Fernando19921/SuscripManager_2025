import { Component, OnInit } from '@angular/core';
import { SuscriptoresService } from '../../core/services/suscriptores.service';
import { suscriptor } from '../../suscriptor/interface/suscriptor-interface';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoadingSpinnerComponent } from '../../core/loading-spinner/loading-spinner.component';
import { delay } from 'rxjs';
import { SearchInputComponent } from '../../core/search-input/search-input.component';

@Component({
  selector: 'app-detalle-suscriptor',
  standalone: true,
  imports: [CommonModule,RouterModule,LoadingSpinnerComponent,SearchInputComponent],
  templateUrl: './detalle-suscriptor.component.html',
  styleUrl: './detalle-suscriptor.component.css'
})
export class DetalleSuscriptorComponent implements OnInit  {
  // Lista de usuarios suscriptores
  public usuarios:suscriptor[]=[];
  // Bandera para mostrar el spinner de carga
  public isLoading: boolean=false;
  // Fecha actual
  public date=new Date

  // Inyecta el servicio de suscriptores
  constructor(private SuscriptoresService:SuscriptoresService){}

  // Se ejecuta al inicializar el componente
  ngOnInit(){
    this.obtenerSuscriptores()
  }

  // Obtiene la lista de suscriptores desde el servicio
  obtenerSuscriptores(){
    this.isLoading=true
    this.SuscriptoresService.getSuscriptores()
    .pipe(
      delay(1000) // Simula un retardo de 1 segundo
    )
    .subscribe(data=>{
      console.log(data)
      this.usuarios=data
      this.isLoading=false
    })
  }

  // Busca suscriptores por término
  search(term:string){
    this.isLoading=true;
    this.SuscriptoresService.searchByTerm(term)
    .pipe(
      delay(1000) // Simula un retardo de 1 segundo
    )
    .subscribe(data=>{
      this.usuarios=[];
      this.isLoading=false;
      this.usuarios=data
    })
  }

  // Verifica si la promoción está vigente
  esPromocionVigente(vigente:string){
    const vigencia:string='Vigente'
    // Compara el estado recibido con 'Vigente' en minúsculas
    return vigente===vigencia.toLocaleLowerCase()
  }
}
