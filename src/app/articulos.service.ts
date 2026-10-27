import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ 
  providedIn: 'root' // <-- ¡Descomentado! Obligatorio para que Angular lo reconozca
})
export class ArticulosService {
  // ATENCIÓN: Cambia "ProyectoPHP" por el nombre exacto de la carpeta 
  // donde guardaste tus archivos Get_Meses.php, etc., dentro de C:\xampp\htdocs\
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