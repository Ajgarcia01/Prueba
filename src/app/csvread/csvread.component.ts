import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-csvread',
  templateUrl: './csvread.component.html',
  styleUrls: ['./csvread.component.css']
})


export class CsvreadComponent implements OnInit {
  @ViewChild('csvread') csvread: any;
  chart: any; //variable para la tabla de gráficos
  dataPoints: any = []; //puntos de entrada de datos para la tabla de gráficos
  showChart: Boolean = false; //booleano para mostrar la tabla
  files!: any; //documentos importados a traves de formato .CSV
  comercio!: String; //variable para mostrar el comercio registrado a traves del .CSV
  transacciones!: any; //variable para mostrar las transacciones del comercio registrado a traves del .CSV
  filename!: any; //variable para mostrar el nombre del archivo .CSV
  transacciones_Aceptadas!: any; //variable para mostrar las transacciones aceptadas del comercio registrado a traves del .CSV
  porcentaje!:any; //variable para mostrar el numero de transacciones aceptadas con respecto al total del comercio registrado a traves del .CSV
  tarr: any[] = []; //array para mostrar el header del archivo .CSV
  tarrs: any[] = []; //array para mostrar las filas del archivo .CSV
  show = true; //booleano para mostrar la gráfica con un button
  currentNumber: number | any //variable para buscar el numero de transacciones Aceptadas

  ngOnInit(): void {

  }

  constructor(private http: HttpClient) { }

  /*
    Método para leer los ficheros .CSV, recorrerlos con arrays y sacar los datos solicitados
  */
  changeListener($event: any) {
    this.files = $event.srcElement.files;
    let reader: FileReader = new FileReader();

    if (this.files && this.files.length > 0) {
      console.log(this.files);

      for (var i = 0; i < this.files.length; i++) {

        let file: File = this.files[i];
        console.log(this.files[i]);

        this.filename = file.name;

        reader.readAsText(file);
        reader.onload = (e) => {
          let csv: any = reader.result;
          let allTextLines = [];
          allTextLines = csv.split(/\r|\n|\r/);

          //Heading del archivo .CSV
          let headers = allTextLines[0].split(';');
          let data = headers;

          let superior = [];
          for (let j = 0; j < headers.length; j++) {
            superior.push(data[j]);
          }
          //Heading del archivo .CSV
          this.tarr.push(superior);

          let contenido = [];
          let arrl = allTextLines.length;
          let rows = [];
          for (let i = 1; i < arrl; i++) {
            rows.push(allTextLines[i].split(';'));
          }

          for (let j = 0; j < arrl; j++) {

            contenido.push(rows[j]);

          }

          //Filas de la tabla
          this.tarrs.push(contenido);

          let contador="Aceptada"
          /**
          * Para saber el numero de transsacciones aceptadas
          */
          for (var i = 0; i < rows.length; i++) {
            var currentNumber = rows[i][5];
            if (currentNumber == 'Aceptada') {
              this.tarrs.push(console.count(contador))
            }

          }

          this.transacciones_Aceptadas = this.tarrs.length
          this.transacciones = rows.length/2;
          this.porcentaje=Math.floor((this.transacciones_Aceptadas*100)/this.transacciones);
          this.comercio = rows[1][9];
          this.show=!this.show

        }
      }
    }
  }

  chartOptions = {
    animationEnabled: true,
    theme: 'dark1',
    title: {
      text: 'Transacciones',
    },
    axisX: {
      reversed: true,
    },
    axisY: {
      title: 'Estadistica',
      includeZero: true,
    },
    data: [
      {
        dataPoints: this.dataPoints,
      },
    ],
  };

  /**
   * Método para mostrar la tabla con datos
   * @param chart
   */
  getChartInstance(chart: object) {
    this.chart = chart;
  }

/**
 * Método para coger los valores del archivo .CSV e introducilros en el data de la tabla
 */
  ngAfterViewInit() {
    this.http
      .get('/assets/primero.csv', {
        responseType: 'text',
      })
      .subscribe((response: any) => {


        let csvRowData = response.split(/[\r?\n|\r|\n]+/);


        csvRowData.forEach((rowData: any, index: number) => {

          if (index === 0) return;
          var data = rowData.split(';');
          this.dataPoints.push({ label: data[0], y: parseInt(data[0]) });



        });
        this.showChart = true;
      });
  }

  isShowDivIf = true;

  toggleDisplayDivIf() {
    this.isShowDivIf = !this.isShowDivIf;
  }






}
