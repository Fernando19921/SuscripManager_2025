import { Component, OnInit } from '@angular/core';
import { SuscriptoresService } from '../../core/services/suscriptores.service';
import { suscriptor } from '../../suscriptor/interface/suscriptor-interface';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoadingSpinnerComponent } from '../../core/loading-spinner/loading-spinner.component';
import { delay } from 'rxjs';


@Component({
  selector: 'app-detalle-suscriptor',
  standalone: true,
  imports: [CommonModule,RouterModule,LoadingSpinnerComponent],
  templateUrl: './detalle-suscriptor.component.html',
  styleUrl: './detalle-suscriptor.component.css'
})
export class DetalleSuscriptorComponent implements OnInit  {
  public usuarios:suscriptor[]=[]
  public isLoading: boolean=false;
  public date=new Date
  constructor(private SuscriptoresService:SuscriptoresService){}

  ngOnInit(){
    this.obtenerSuscriptores()
  }

  obtenerSuscriptores(){
    this.isLoading=true
    this.SuscriptoresService.getSuscriptores()
    .pipe(
      delay(1000)
    )
    .subscribe(data=>{
      this.usuarios=data
      this.isLoading=false
    })
  }

  esPromocionVigente(fechaInicio:string, fechaFin:string){
    const hoy=new Date();
    const inicio=new Date(fechaInicio);
    const fin= new Date(fechaFin);
    return hoy>=inicio && hoy<= fin
  }
}
