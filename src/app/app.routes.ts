import { Routes } from '@angular/router';
import { Casa } from './casa/casa';
import { TablaSucursales } from './tabla-sucursales/tabla-sucursales';
import { Inicio } from './inicio/inicio';

export const routes: Routes = [{path: 'casa', component: Casa}, {path: 'tabla-sucursales', component: TablaSucursales}, {path: 'inicio', component: Inicio},{path: '', redirectTo:"inicio", pathMatch: 'full'} ];
