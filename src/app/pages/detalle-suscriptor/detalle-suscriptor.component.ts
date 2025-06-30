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
  public usuarios:suscriptor[]=[];
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
      console.log(data)
      this.usuarios=data
      this.isLoading=false
    })
  }

  search(term:string){
    this.isLoading=true;
    this.SuscriptoresService.searchByTerm(term)
    .pipe(
      delay(1000)
    )
    .subscribe(data=>{
      this.usuarios=[];
      this.isLoading=false;
      this.usuarios=data
    })
  }

  esPromocionVigente(vigente:string){
    const vigencia:string='Vigente'
    return vigente===vigencia.toLocaleLowerCase()
  }
}
