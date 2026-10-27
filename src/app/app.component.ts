import { Component, OnInit } from '@angular/core';
import { ArticulosService } from './articulos.service';
import { Sucursales } from './componentes/sucursales/sucursales';
import {RouterOutlet} from '@angular/router'
import { CommonModule } from '@angular/common';



@Component({
  providers: [ArticulosService],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet, CommonModule],
})
export class AppComponent implements OnInit{

  title = 'AngPHP';
  articulos : any=[];
  datos :any=[];
  meses : any=[];
  sucursales : any=[Sucursales];
  clientes : any=[];
  ventas : any=[];
  sales :any=Array(Array());
  art = {
    codigo: null,
    descripcion: null,
    precio: null

  };
  mes = {
    Nro:null,
    Mes: null,
    CDias: null
  };
kk:number =10;
  
  
  
  constructor(private articulosServicio: ArticulosService) {}
// constructor() {}
  ngOnInit() {

  }  

}


