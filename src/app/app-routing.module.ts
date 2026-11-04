import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ListaSucursalesComponent } from './lista-sucursales/lista-sucursales.component';
import { VentasComponent } from './ventas/ventas.component';
import { LoginComponent } from './login/login.component';
import { adminGuard, homeGuard, loginGuard, salesGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
  { path: 'home', component: HomeComponent, canActivate: [homeGuard] },
  { path: 'clientes', component: ClientesComponent, canActivate: [adminGuard] },
  { path: 'sucursales', component: ListaSucursalesComponent, canActivate: [adminGuard] },
  { path: 'ventas', component: VentasComponent, canActivate: [salesGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];