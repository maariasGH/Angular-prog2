import { Component, OnInit } from '@angular/core';
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
  cargando = false;
  error = '';

  constructor(private artServ: ArticulosService) { }

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
      },
      error: (err) => {
        this.error = 'Error al cargar los clientes';
        this.cargando = false;
        console.error(err);
      }
    });
  }
}