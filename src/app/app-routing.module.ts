import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ListaSucursalesComponent } from './lista-sucursales/lista-sucursales.component';
import { VentasComponent } from './ventas/ventas.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'sucursales', component: ListaSucursalesComponent },
  { path: 'ventas', component: VentasComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];