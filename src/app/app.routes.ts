import { Routes } from '@angular/router';
import { DetalleSuscriptorComponent } from './pages/detalle-suscriptor/detalle-suscriptor.component';
import { DeudaSuscriptorComponent } from './pages/deuda-suscriptor/deuda-suscriptor.component';

export const routes: Routes = [
  {
    path:'detalle-suscriptor',
    component:DetalleSuscriptorComponent
  },

  {
    path:"deuda-suscriptor",
    component:DeudaSuscriptorComponent
  }
];
