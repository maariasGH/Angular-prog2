import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticulosService } from '../articulos.service';

interface Cliente {
  id_cliente?: number;
  nombre?: string;
  apellido?: string;
  email?: string;
  telefono?: string;
  direccion?: string;
  id_sucursal?: number;
  sucursal?: string;
}

@Component({
  selector: 'app-clientes',
  imports: [CommonModule],
  templateUrl: './clientes.html',
  styleUrl: './clientes.css'
})
export class Clientes implements OnInit {
  clientes: Cliente[] = [];
  cargando = true;
  error = '';

  constructor(private service: ArticulosService) {}

  ngOnInit() {
    this.cargarClientes();
  }

  cargarClientes() {
    this.cargando = true;
    this.error = '';
    this.service.recuperarClientes().subscribe({
      next: (data: any) => {
        this.clientes = Array.isArray(data) ? data : [];
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'No se pudieron cargar los clientes. Verificá que el servidor PHP esté corriendo.';
        this.cargando = false;
        console.error('Error cargando clientes:', err);
      }
    });
  }

  recargar() {
    this.cargarClientes();
  }

  getNombreCompleto(cliente: Cliente): string {
    return `${cliente.nombre || ''} ${cliente.apellido || ''}`.trim() || 'Sin nombre';
  }
}