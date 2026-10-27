import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticulosService } from '../articulos.service';

interface Estadistica {
  label: string;
  valor: number;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  estadisticas: Estadistica[] = [];
  cargando = true;
  error = '';

  constructor(private service: ArticulosService) {}

  ngOnInit() {
    this.cargarEstadisticas();
  }

  cargarEstadisticas() {
    this.cargando = true;
    this.service.recuperarClientes().subscribe({
      next: (clientes: any) => {
        const totalClientes = Array.isArray(clientes) ? clientes.length : 0;

        this.service.recuperarSucus().subscribe({
          next: (sucursales: any) => {
            const totalSucursales = Array.isArray(sucursales) ? sucursales.length : 0;

            this.service.recuperarVentas().subscribe({
              next: (ventas: any) => {
                const totalVentas = Array.isArray(ventas) ? ventas.length : 0;
                const montoTotal = Array.isArray(ventas)
                  ? ventas.reduce((sum: number, v: any) => sum + (v.total || v.monto || 0), 0)
                  : 0;

                this.estadisticas = [
                  { label: 'Clientes', valor: totalClientes, icon: 'users', color: '#2563eb' },
                  { label: 'Sucursales', valor: totalSucursales, icon: 'store', color: '#10b981' },
                  { label: 'Ventas', valor: totalVentas, icon: 'shopping-cart', color: '#f59e0b' },
                  { label: 'Monto Total', valor: montoTotal, icon: 'dollar-sign', color: '#8b5cf6' }
                ];
                this.cargando = false;
              },
              error: () => {
                this.error = 'Error al cargar ventas';
                this.cargando = false;
              }
            });
          },
          error: () => {
            this.error = 'Error al cargar sucursales';
            this.cargando = false;
          }
        });
      },
      error: () => {
        this.error = 'Error al cargar clientes';
        this.cargando = false;
      }
    });
  }

  getIcon(icon: string): string {
    const icons: Record<string, string> = {
      users: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
      store: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h12l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>',
      'shopping-cart': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>',
      'dollar-sign': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>'
    };
    return icons[icon] ?? icons['users'];
  }

  formatearMonto(valor: number): string {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(valor);
  }
}