import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabla-sucursales',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla-sucursales.html',
  styleUrls: ['./tabla-sucursales.css']
})
export class TablaSucursales implements OnInit, AfterViewInit {
  
  // Capturamos el Canvas de forma segura desde Angular
  @ViewChild('graficoCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  readonly meses = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
  readonly sucursales = ["Santa Fe", "Paraná", "Rosario", "Rafaela", "Santo Tomé"];
  readonly colores = ["Red", "Blue", "Green", "Yellow", "Purple"];
  
  // Variables de estado usando Señales de Angular (Angular Signals)
  cantSucursales = signal<number>(3);
  tipoGrafico = signal<string>('lineas');
  datos: number[][] = [];

  // Computed property que reacciona automáticamente cuando cambia la cantidad
  sucursalesvisibles = computed(() => {
    return this.sucursales.slice(0, this.cantSucursales());
  });

  ngOnInit(): void {
    this.inicializarDatos();
  }

  ngAfterViewInit(): void {
    // Una vez que el canvas existe en el DOM, dibujamos por primera vez
    this.dibujarGrafico();
  }

  inicializarDatos(): void {
    let cant = this.cantSucursales();
    this.datos = [];
    for (let f = 0; f < 12; f++) {
      let fila: number[] = [];
      for (let c = 0; c < cant; c++) {
        fila.push(Math.round(50 + Math.random() * 100));
      }
      this.datos.push(fila);
    }
  }

  actualizarCantidad(event: Event): void {
    const input = event.target as HTMLInputElement;
    let cant = parseInt(input.value);
    
    if (isNaN(cant) || cant < 1) cant = 1;
    if (cant > 5) cant = 5;
    
    this.cantSucursales.set(cant);
    this.inicializarDatos();
    
    // Forzamos el redibujado en el siguiente ciclo para que el DOM se actualice antes
    setTimeout(() => this.dibujarGrafico(), 0);
  }

  cambiarTipoGrafico(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.tipoGrafico.set(select.value);
    this.dibujarGrafico();
  }

  cambiarDato(f: number, c: number, event: Event): void {
    const input = event.target as HTMLInputElement;
    let val = parseFloat(input.value);
    this.datos[f][c] = isNaN(val) ? 0 : val;
    this.dibujarGrafico();
  }

  dibujarGrafico(): void {
    if (!this.canvasRef) return;
    
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const tipo = this.tipoGrafico();
    let cant = this.cantSucursales();

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let margenIzq = 60;
    let margenDer = 20;
    let margenSup = 30;
    let margenInf = 40;
    let anchoG = canvas.width - margenIzq - margenDer;
    let altoG = canvas.height - margenSup - margenInf;

    let maxVal = 100;
    if (tipo === 'acumuladas') {
      maxVal = 0;
      for (let f = 0; f < 12; f++) {
        let suma = 0;
        for (let c = 0; c < cant; c++) suma += this.datos[f][c];
        if (suma > maxVal) maxVal = suma;
      }
    } else {
      for (let f = 0; f < 12; f++) {
        for (let c = 0; c < cant; c++) {
          if (this.datos[f][c] > maxVal) maxVal = this.datos[f][c];
        }
      }
    }
    maxVal = Math.ceil(maxVal / 10) * 10;

    ctx.strokeStyle = "#ccc";
    ctx.lineWidth = 1;
    ctx.font = "12px sans-serif";
    ctx.fillStyle = "#333";
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";

    for (let i = 0; i <= 5; i++) {
      let y = margenSup + altoG - (i / 5) * altoG;
      let val = (i / 5) * maxVal;
      ctx.beginPath();
      ctx.moveTo(margenIzq, y);
      ctx.lineTo(canvas.width - margenDer, y);
      ctx.stroke();
      ctx.fillText(Math.round(val).toString(), margenIzq - 10, y);
    }

    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    let pasoX = anchoG / 12;

    for (let f = 0; f < 12; f++) {
      let x = margenIzq + (f * pasoX) + (pasoX / 2);
      ctx.fillText(this.meses[f], x, canvas.height - margenInf + 10);
    }

    if (tipo === 'lineas') {
      for (let c = 0; c < cant; c++) {
        ctx.strokeStyle = this.colores[c];
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let f = 0; f < 12; f++) {
          let x = margenIzq + (f * pasoX) + (pasoX / 2);
          let y = margenSup + altoG - (this.datos[f][c] / maxVal) * altoG;
          if (f === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    } else if (tipo === 'barras') {
      let anchoBarra = (pasoX) / cant;
      for (let f = 0; f < 12; f++) {
        let xInicio = margenIzq + (f * pasoX) + 5;
        for (let c = 0; c < cant; c++) {
          let h = (this.datos[f][c] / maxVal) * altoG;
          ctx.fillStyle = this.colores[c];
          ctx.fillRect(xInicio + (c * anchoBarra), margenSup + altoG - h, anchoBarra, h);
        }
      }
    } else if (tipo === 'acumuladas') {
      let anchoBarra = pasoX;
      for (let f = 0; f < 12; f++) {
        let x = margenIzq + (f * pasoX) + 5;
        let yAcum = 0;
        for (let c = 0; c < cant; c++) {
          let h = (this.datos[f][c] / maxVal) * altoG;
          ctx.fillStyle = this.colores[c];
          ctx.fillRect(x, margenSup + altoG - h - yAcum, anchoBarra, h);
          yAcum += h;
        }
      }
    }

    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    for (let c = 0; c < cant; c++) {
      let x = margenIzq + (c * 100);
      ctx.fillStyle = this.colores[c];
      ctx.fillRect(x, 10, 15, 10);
      ctx.fillStyle = "#333";
      ctx.fillText(this.sucursales[c], x + 20, 15);
    }
  }
}