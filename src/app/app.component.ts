import { Component, OnInit } from '@angular/core';
import { ArticulosService } from './articulos.service';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  imports: [RouterOutlet, CommonModule],
})
export class AppComponent implements OnInit {
  title = 'AngPHP';

  constructor(private articulosServicio: ArticulosService) {}

  ngOnInit() {
    // Precargar datos al iniciar la aplicación
    this.cargarDatosIniciales();
  }

  cargarDatosIniciales() {
    // Precargar meses
    this.articulosServicio.recuperarMeses().subscribe({
      next: (data) => console.log('Meses cargados:', data),
      error: (err) => console.error('Error cargando meses:', err)
    });

    // Precargar sucursales
    this.articulosServicio.recuperarSucus().subscribe({
      next: (data) => console.log('Sucursales cargadas:', data),
      error: (err) => console.error('Error cargando sucursales:', err)
    });
  }
}


