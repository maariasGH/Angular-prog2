import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sucursales',
  imports: [],
  templateUrl: './sucursales.html',
  styleUrl: './sucursales.css',
})
export class Sucursales implements OnInit {

    suc:any = new Array(5);

    ngOnInit(): void {
        this.suc= [{id: "Santa Fe",nEmp:20,dir:"San Martin 1111"},
          {id: "Rosario",nEmp:15,dir:"Rioja 2222"},
          {id: "Parana",nEmp:10,dir:"San Jeronimo 3333"},
          {id: "Chajari",nEmp:30,dir:"9 de Julio 4444"},
          {id: "Concordia", nEmp:5, dir:"Costanera 5555"}]
    }
}
