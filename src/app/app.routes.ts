import { Routes } from '@angular/router';
import { Casa } from './casa/casa';
import { TablaSucursales } from './tabla-sucursales/tabla-sucursales';
import { Inicio } from './inicio/inicio';
import { Sucursales } from './sucursales/sucursales';
import { Clientes } from './clientes/clientes';

export const routes: Routes = [{path: 'casa', component: Casa}, {path: 'tabla-sucursales', component: TablaSucursales}, {path: 'inicio', component: Inicio},{path: '', redirectTo:"inicio", pathMatch: 'full'}, {path: 'sucursales', component: Sucursales}, {path: 'clientes', component: Clientes}];
