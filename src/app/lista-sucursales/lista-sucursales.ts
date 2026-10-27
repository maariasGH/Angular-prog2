import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticulosService } from '../articulos.service';

interface Sucursal {
  id_sucursal?: number;
  nombre?: string;
  direccion?: string;
  telefono?: string;
  email?: string;
  responsable?: string;
}

@Component({
  selector: 'app-lista-sucursales',
  imports: [CommonModule],
  templateUrl: './lista-sucursales.html',
  styleUrl: './lista-sucursales.css'
})
export class ListaSucursales implements OnInit {
  sucursales: Sucursal[] = [];
  cargando = true;
  error = '';

  constructor(private service: ArticulosService) {}

  ngOnInit() {
    this.cargarSucursales();
  }

  cargarSucursales() {
    this.cargando = true;
    this.error = '';
    this.service.recuperarSucus().subscribe({
      next: (data: any) => {
        this.sucursales = Array.isArray(data) ? data : [];
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'No se pudieron cargar las sucursales. Verificá que el servidor PHP esté corriendo.';
        this.cargando = false;
        console.error('Error cargando sucursales:', err);
      }
    });
  }

  recargar() {
    this.cargarSucursales();
  }
}