import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { ArticulosService } from '../articulos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css'],
  imports: [CommonModule]
})
export class VentasComponent implements OnInit {
  ventas: any[] = [];
  sucursales: any[] = [];
  cargando = false;
  error = '';

  constructor(private VentServ: ArticulosService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.recargar();
  }

  recargar() {
    this.cargando = true;
    this.error = '';

    this.VentServ.recuperarVentas().subscribe({
      next: (data: any) => {
        this.ventas = (data as any[]) || [];
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = 'Error al cargar las ventas';
        this.cargando = false;
        this.cdr.detectChanges();
        console.error(err);
      }
    });

    this.VentServ.recuperarSucus().subscribe({
      next: (data: any) => {
        this.sucursales = (data as any[]) || [];
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  formatearFecha(fecha: string): string {
    if (!fecha) return '-';
    const date = new Date(fecha);
    return date.toLocaleDateString('es-AR');
  }

  getMonto(venta: any): number {
    // La API ahora devuelve el total directamente en venta.total
    return venta.total ? parseFloat(venta.total) : 0;
  }

  formatearMonto(monto: number): string {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(monto);
  }
}