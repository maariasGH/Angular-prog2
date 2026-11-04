import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { ArticulosService, Venta } from '../articulos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css'],
  imports: [CommonModule]
})
export class VentasComponent implements OnInit {
  ventas: Venta[] = [];
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
      next: (data) => {
        this.ventas = data;
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
  }

  formatearFecha(fecha: string): string {
    if (!fecha) return '-';
    const date = new Date(fecha);
    return date.toLocaleDateString('es-AR');
  }

  getMonto(venta: Venta): number {
    return Number(venta.total) || 0;
  }

  formatearMonto(monto: number): string {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(monto);
  }

}