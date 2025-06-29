import {
  Component,
  OnInit,
  Inject,
  PLATFORM_ID,
  ElementRef,
  ViewChild
} from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SuscriptoresService } from '../../core/services/suscriptores.service';
import { reporteSuscriptor, suscriptor } from '../../suscriptor/interface/suscriptor-interface';
import { delay, switchMap } from 'rxjs';
import { CommonModule, isPlatformBrowser } from '@angular/common';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { LoadingSpinnerComponent } from '../../core/loading-spinner/loading-spinner.component';

@Component({
  selector: 'pages-inf-suscriptor',
  standalone: true,
  imports: [CommonModule, RouterModule,LoadingSpinnerComponent],
  templateUrl: './inf-suscriptor.component.html',
  styleUrls: ['./inf-suscriptor.component.css']
})
export class InfSuscriptorComponent implements OnInit {
  public suscriptorSeleccionado!:reporteSuscriptor[];
  public isLoading:boolean=false;

  // Elemento que contiene todo lo que se exportará al PDF
  @ViewChild('contenidoPDF', { static: false }) contenidoPDF!: ElementRef;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private suscriptoresService: SuscriptoresService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading=true
    this.activateRoute.params
      .pipe(
        switchMap(({ id }) =>
          this.suscriptoresService.searchSuscriptorById(Number(id))
        ),
        delay(2000)
      )
      .subscribe((data) => {
        if (!data) {
          this.router.navigateByUrl('');
          return;
        }
        this.suscriptorSeleccionado=data
        console.log(this.suscriptorSeleccionado)
        this.isLoading=false;
      });
  }

  async exportarPDF() {
  if (!isPlatformBrowser(this.platformId)) return;

  const input = this.contenidoPDF.nativeElement;
  const canvas = await html2canvas(input, { scale: 2 });
  const imgData = canvas.toDataURL('image/png');

  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth();

  const img = new Image();
  img.src = imgData;

  img.onload = () => {
    const imgHeight = (img.height * pdfWidth) / img.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, imgHeight);
    pdf.save(`suscriptor_${this.suscriptorSeleccionado[0]?.nombre}.pdf`);
  };
}

   esPromocionVigente(vigente:string){
    const vigencia:string='Activa'
    return vigente===vigencia.toLocaleLowerCase()
  }

}
