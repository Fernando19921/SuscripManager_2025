import { Component, OnInit } from '@angular/core';
import { SuscriptoresService } from '../../core/services/suscriptores.service';
import { suscriptor } from '../../suscriptor/interface/suscriptor-interface';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-detalle-suscriptor',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './detalle-suscriptor.component.html',
  styleUrl: './detalle-suscriptor.component.css'
})
export class DetalleSuscriptorComponent implements OnInit  {
  public usuarios:suscriptor[]=[]
  constructor(private SuscriptoresService:SuscriptoresService){}

  ngOnInit(){
    this.obtenerSuscriptores()
  }

  obtenerSuscriptores(){
    this.SuscriptoresService.getSuscriptores().subscribe(data=>{
      this.usuarios=data
    })
  }
}
