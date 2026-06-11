import { Component, signal, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Casa } from './casa/casa';
import { TablaSucursales } from './tabla-sucursales/tabla-sucursales';
import { RouterLink } from '@angular/router';
import { Inicio } from './inicio/inicio';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Casa, TablaSucursales, RouterLink, Inicio],
  templateUrl: './app.html',
  styleUrl: './app.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class App {
  protected readonly title = signal('cara de coca cola');
}
