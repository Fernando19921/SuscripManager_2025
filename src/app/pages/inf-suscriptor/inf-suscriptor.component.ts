import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SuscriptoresService } from '../../core/services/suscriptores.service';
import { suscriptor } from '../../suscriptor/interface/suscriptor-interface';
import { switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pages-inf-suscriptor',
  standalone: true,
  imports:[CommonModule,RouterModule],
  templateUrl: './inf-suscriptor.component.html',
  styleUrls: ['./inf-suscriptor.component.css']
})
export class InfSuscriptorComponent implements OnInit {
  public suscriptorSeleccionado!: suscriptor | null;

  constructor(
    private suscriptoresService: SuscriptoresService,
    private activateRoute: ActivatedRoute,
    private router:Router
  ) {}

ngOnInit(): void {
  this.activateRoute.params
    .pipe(
      switchMap(({id})=>this.suscriptoresService.searchSuscriptorById(Number(id)))
    )
    .subscribe(data =>{
      if(!data){
        this.router.navigateByUrl('')
        return;
      }
      this.suscriptorSeleccionado=data
    });
}

exportarPDF(){

}
}


