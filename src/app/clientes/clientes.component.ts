import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ArticulosService } from '../articulos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
  imports: [CommonModule]
})
export class ClientesComponent implements OnInit {
  clientes: any[] = [];
  sucursales: any[] = [];
  cargando = false;
  error = '';

  constructor(private artServ: ArticulosService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.recargar();
  }

  recargar() {
    this.cargando = true;
    this.error = '';

    this.artServ.recuperarClientes().subscribe({
      next: (data: any) => {
        this.clientes = (data as any[]) || [];
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = 'Error al cargar los clientes';
        this.cargando = false;
        this.cdr.detectChanges();
        console.error(err);
      }
    });

    this.artServ.recuperarSucus().subscribe({
      next: (data: any) => {
        this.sucursales = (data as any[]) || [];
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  obtenerNombreSucursal(id_sucursal: number): string {
    if (!id_sucursal || this.sucursales.length === 0) return '-';
    // Buscamos la sucursal cuyo Id_Suc coincida con el del cliente
    const sucursal = this.sucursales.find(s => s.Id_Suc == id_sucursal || s[0] == id_sucursal);
    
    if (sucursal) {
      return sucursal.Nombre_Suc || sucursal[1];
    }
    return `Sucursal ${id_sucursal}`;
  }
}