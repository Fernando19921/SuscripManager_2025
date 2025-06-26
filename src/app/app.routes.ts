import { Routes } from '@angular/router';
import { DetalleSuscriptorComponent } from './pages/detalle-suscriptor/detalle-suscriptor.component';
import { DeudaSuscriptorComponent } from './pages/deuda-suscriptor/deuda-suscriptor.component';
import { InfSuscriptorComponent } from './pages/inf-suscriptor/inf-suscriptor.component';

export const routes: Routes = [
  {
    path:'detalle-suscriptor',
    component:DetalleSuscriptorComponent,
  },

  {
    path:'detalle/:id',
    component:InfSuscriptorComponent

  },

  {
    path:"deuda-suscriptor",
    component:DeudaSuscriptorComponent
  }
];
