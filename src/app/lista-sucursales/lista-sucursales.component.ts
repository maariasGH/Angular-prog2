import { Component, OnInit } from '@angular/core';
import { ArticulosService } from '../articulos.service';
import { CommonModule } from '@angular/common';
@Component({
 
  selector: 'app-lista-sucursales',
  templateUrl: './lista-sucursales.component.html',
  styleUrls: ['./lista-sucursales.component.css'],
  providers: [ArticulosService],
  imports: [CommonModule]
})
export class ListaSucursalesComponent implements OnInit {
sucursales:any=[];

  constructor(private sucServ:ArticulosService) { }

  ngOnInit(): void {
  this.recuperarSucus();
  }
  recuperarSucus(){
    this.sucServ.recuperarSucus().subscribe(ss => {this.sucursales = (ss);
  //alert (JSON.stringify(this.sucursales));
  });
}

}