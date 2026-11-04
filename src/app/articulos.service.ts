import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from './api-url';

export interface Venta {
  id_venta: number;
  fecha: string;
  id_cliente: number;
  total: string | number;
  IVA: string | number;
  detalles: string;
  id_sucursal: number;
  cliente_nombre: string | null;
  sucursal_nombre: string | null;
}

@Injectable({ 
  providedIn: 'root'
})
export class ArticulosService {
  url = API_URL;

  constructor(private http: HttpClient) { }

  recuperarMeses() {
    return this.http.get(`${this.url}Get_Meses.php`, { withCredentials: true });
  }

  recuperarSucus() {
    return this.http.get(`${this.url}Get_Sucus.php`, { withCredentials: true });
  }

  recuperarClientes() {
    return this.http.get(`${this.url}Get_Clientes.php`, { withCredentials: true });
  }

  recuperarVentas() {
    return this.http.get<Venta[]>(`${this.url}Get_Ventas.php`, { withCredentials: true });
  }

  // Ejemplo de cómo quedaría el alta de una factura (POST)
  altaFactura(factura: any) {
    return this.http.post(`${this.url}Insert_Factura.php`, JSON.stringify(factura), {
      withCredentials: true,
    });
  }
}