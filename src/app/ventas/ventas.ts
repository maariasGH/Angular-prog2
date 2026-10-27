import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticulosService } from '../articulos.service';

interface Venta {
  id_venta?: number;
  fecha?: string;
  id_cliente?: number;
  cliente?: string;
  id_sucursal?: number;
  sucursal?: string;
  total?: number;
  monto?: number;
  detalles?: string;
}

@Component({
  selector: 'app-ventas',
  imports: [CommonModule],
  templateUrl: './ventas.html',
  styleUrl: './ventas.css'
})
export class Ventas implements OnInit {
  ventas: Venta[] = [];
  cargando = true;
  error = '';

  constructor(private service: ArticulosService) {}

  ngOnInit() {
    this.cargarVentas();
  }

  cargarVentas() {
    this.cargando = true;
    this.error = '';
    this.service.recuperarVentas().subscribe({
      next: (data: any) => {
        this.ventas = Array.isArray(data) ? data : [];
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'No se pudieron cargar las ventas. Verificá que el servidor PHP esté corriendo.';
        this.cargando = false;
        console.error('Error cargando ventas:', err);
      }
    });
  }

  recargar() {
    this.cargarVentas();
  }

  getMonto(venta: Venta): number {
    return venta.total ?? venta.monto ?? 0;
  }

  formatearFecha(fecha: string | undefined): string {
    if (!fecha) return '-';
    try {
      const date = new Date(fecha);
      return date.toLocaleDateString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch {
      return fecha;
    }
  }

  formatearMonto(valor: number): string {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(valor);
  }
}