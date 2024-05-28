import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective, FormSelectDirective, TableDirective, TableColorDirective, ModalComponent, ModalDialogComponent, ModalToggleDirective, ModalHeaderComponent, ModalBodyComponent, ModalFooterComponent, ButtonCloseDirective, ModalModule, ToastComponent, ToastHeaderComponent, ToastBodyComponent, ProgressBarComponent, ProgressBarDirective, ProgressComponent, ToasterComponent } from '@coreui/angular';
import { ReporteActivosTitularModel } from '../models/reporte-activos-titular.model';
import { ActivoService } from '../services/activo.service';
import { TitularModel } from '../models/titular.model';
import { TitularService } from '../services/titular.service';

@Component({
  selector: 'app-reporteActivo',
  standalone: true,
  imports: [RowComponent, ColComponent, TextColorDirective, 
    CardComponent, CardHeaderComponent, CardBodyComponent,  
    ReactiveFormsModule, 
    FormsModule, FormDirective, FormLabelDirective, FormControlDirective, 
    ButtonDirective,     NgStyle, FormSelectDirective,
    TableColorDirective,TableDirective,
    ModalComponent,ModalHeaderComponent,ModalBodyComponent,ModalFooterComponent,ModalToggleDirective,ButtonCloseDirective,
  ToasterComponent,ToastComponent,ToastHeaderComponent,ToastBodyComponent,ProgressBarComponent,ProgressBarDirective,ProgressComponent,
  ],
  templateUrl: './reporte-activos.component.html',
  styleUrl: './reporte-activos.component.scss'
})
export class ReporteActivosComponent {

  reporteActivo:ReporteActivosTitularModel|null=null;
  titularesLista:TitularModel[]=[];
  titularSeleccionadoId="";
  
  constructor(private activoService:ActivoService,private titularService:TitularService) {
    this.llenarComboTitulares();
    this.mostrarReporteActivos("todos");
  }

  //mostrar reporte acitivos por titular 
  // ==============================================================================
  mostrarReporteActivos(idTitular:string){
    this.activoService.listaActivosPorTitular(idTitular).subscribe({
      next:(res)=>{
        this.reporteActivo=res;
      },
      error:(error)=>{
        this.reporteActivo=null;
        console.error(error);
      }
    })
  }

  // ==============================================================================
  //llenar combo titular para combo
  // ==============================================================================
  private llenarComboTitulares(){
    this.titularService.listar().subscribe({
      next:(res)=>{
        this.titularesLista=res;
      },
      error:(error)=>{
        console.error(error)
      }
    });
  }


  titularSeleccionado(valor:string){
    this.mostrarReporteActivos(valor);
  }

}
