import { Component, Input, Output, EventEmitter, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';


@Component({
  selector: 'app-form-edit-promo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSlideToggleModule,
  ],
  templateUrl: './form-edit-promo.component.html',
  styleUrls: ['./form-edit-promo.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FormEditPromoComponent implements OnInit {
  @Input() data: any;
  @Output() guardarPromocion = new EventEmitter<any>();
  @Output() cancelarEdicion = new EventEmitter<void>();

  constructor(private router: Router){}
  promocion: any;
  esEdicion:boolean=false

  ngOnInit(): void {
    this.promocion = {
      nombre: this.data?.nombre || '',
      descripcion: this.data?.descripcion || '',
      fecha_inicio: this.data?.fecha_inicio ? new Date(this.data.fecha_inicio) : null,
      fecha_fin: this.data?.fecha_fin ? new Date(this.data.fecha_fin) : null,
      tipoDescuento: this.data?.tipoDescuento || '',
      estado: this.data?.estado ?? true,
      id: this.data?.id // se conserva si está editando
    };
    this.esEdicion = !!this.promocion.id;
  }

  guardar(): void {
    console.log('Formulario emitido:', this.promocion);
    this.guardarPromocion.emit(this.promocion);
  }

  cancelar(): void {
    this.cancelarEdicion.emit();
  }
}
