import { Routes } from '@angular/router';
import { DetalleSuscriptorComponent } from './pages/detalle-suscriptor/detalle-suscriptor.component';
import { DeudaSuscriptorComponent } from './pages/deuda-suscriptor/deuda-suscriptor.component';
import { InfSuscriptorComponent } from './pages/inf-suscriptor/inf-suscriptor.component';
import { ConfigPromocinesComponent } from './pages/config-promocines/config-promocines.component';

export const routes: Routes = [
  { path:'',
    redirectTo:'detalle-suscriptor',
    pathMatch:'full'
  },
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
  },
  {
    path:"config-suscripciones",
    component:ConfigPromocinesComponent
  }
];
