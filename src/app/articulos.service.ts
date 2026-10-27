import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ 
  providedIn: 'root'
})
export class ArticulosService {
  // IMPORTANTE: Cambia "bd-sucur" por el nombre exacto de tu carpeta en C:\xampp\htdocs\
  // Ejemplos comunes: "ProyectoPHP", "mi-api", "backend", etc.
  url = 'http://localhost/bd-sucur/'; 

  constructor(private http: HttpClient) { }

  recuperarMeses() {
    return this.http.get(`${this.url}Get_Meses.php`);
  }

  recuperarSucus() {
    return this.http.get(`${this.url}Get_Sucus.php`);
  }

  recuperarClientes() {
    return this.http.get(`${this.url}Get_Clientes.php`);
  }

  recuperarVentas() {
    return this.http.get(`${this.url}Get_Ventas.php`);
  }

  // Ejemplo de cómo quedaría el alta de una factura (POST)
  altaFactura(factura: any) {
    return this.http.post(`${this.url}Insert_Factura.php`, JSON.stringify(factura));
  }
}