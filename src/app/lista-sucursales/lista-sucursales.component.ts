import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ArticulosService } from '../articulos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-sucursales',
  templateUrl: './lista-sucursales.component.html',
  styleUrls: ['./lista-sucursales.component.css'],
  imports: [CommonModule]
})
export class ListaSucursalesComponent implements OnInit {
  sucursales: any[] = [];
  cargando = false;
  error = '';

  constructor(private sucServ: ArticulosService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.recargar();
  }

  recargar() {
    this.cargando = true;
    this.error = '';
    this.sucServ.recuperarSucus().subscribe({
      next: (data: any) => {
        this.sucursales = (data as any[]) || [];
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = 'Error al cargar las sucursales';
        this.cargando = false;
        this.cdr.detectChanges();
        console.error(err);
      }
    });
  }
}