import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { FormEditPromoComponent } from '../form-edit-promo/form-edit-promo.component';

@Component({
  selector: 'app-config-promocines',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    FormEditPromoComponent
  ],
  templateUrl: './config-promocines.component.html',
  styleUrls: ['./config-promocines.component.css']
})
export class ConfigPromocinesComponent {
  mostrarFormulario = false;
  promocionSeleccionada: any = null;

  promociones = [
    {
      id: 1,
      nombre: 'Promoción de Verano',
      tipo_descuento: 'porcentaje',
      descuento: 20,
      fecha_inicio: '2025-07-01',
      fecha_fin: '2025-07-15'
    },
    {
      id: 2,
      nombre: 'Descuento 100 MXN',
      tipo_descuento: 'cantidad',
      descuento: 100,
      fecha_inicio: '2025-07-05',
      fecha_fin: '2025-07-30'
    }
  ];

  columnas: string[] = ['nombre', 'tipo_descuento', 'descuento', 'acciones'];

  abrirFormularioParaCrear(): void {
    this.promocionSeleccionada = null;
    this.mostrarFormulario = true;
  }

  abrirFormularioParaEditar(promo: any): void {
    this.promocionSeleccionada = { ...promo };
    this.mostrarFormulario = true;
  }

  guardarPromocion(promo: any): void {
    if (!promo) {
      this.mostrarFormulario = false;
      return;
    }

    if (promo.id) {
      // Editar
      const index = this.promociones.findIndex(p => p.id === promo.id);
      if (index !== -1) this.promociones[index] = promo;
    } else {
      // Crear
      promo.id = this.promociones.length + 1;
      this.promociones.push(promo);
    }

    this.mostrarFormulario = false;
  }
}
