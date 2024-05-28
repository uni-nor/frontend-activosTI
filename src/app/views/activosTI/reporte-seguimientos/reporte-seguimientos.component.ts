import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective, FormSelectDirective, TableDirective, TableColorDirective, ModalComponent, ModalDialogComponent, ModalToggleDirective, ModalHeaderComponent, ModalBodyComponent, ModalFooterComponent, ButtonCloseDirective, ModalModule, ToastComponent, ToastHeaderComponent, ToastBodyComponent, ProgressBarComponent, ProgressBarDirective, ProgressComponent, ToasterComponent } from '@coreui/angular';

import { ActivoService } from '../services/activo.service';
import { ReporteSeguimientoModel } from '../models/reporte-seguimiento.model';
import { ActivoModel } from '../models/activo.model';
import { SeguimientoService } from '../services/seguimiento.service';


@Component({
  selector: 'app-reporteSeguimientos',
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
  templateUrl: './reporte-seguimientos.component.html',
  styleUrl: './reporte-seguimientos.component.scss'
})
export class ReporteSeguimientosComponent {

  reporteSeguimiento:ReporteSeguimientoModel|null=null;
  activosLista:ActivoModel[]=[];
  activoSeleccionadoId="";
  
  constructor(private seguimientoService:SeguimientoService,private activoService:ActivoService) {
    this.llenarComboActivos();
    this.mostrarRerporteSeguimientos("todos");
  }

  //mostrar reporte acitivos por titular 
  // ==============================================================================
  mostrarRerporteSeguimientos(idActivo:string){
    this.seguimientoService.reporteSeguimientoActivos(idActivo).subscribe({
      next:(res)=>{
        this.reporteSeguimiento=res;
      },
      error:(error)=>{
        this.reporteSeguimiento=null;
        console.error(error);
      }
    })
  }

  // ==============================================================================
  //llenar combo titular para combo
  // ==============================================================================
  private llenarComboActivos(){
    this.activoService.listar().subscribe({
      next:(res)=>{
        this.activosLista=res;
      },
      error:(error)=>{
        console.error(error)
      }
    });
  }


  activoSeleccionado(valor:string){
    this.mostrarRerporteSeguimientos(valor);
  }

  mostrarOcultarSeguimiento(idActivo:string){
    const boton=document.getElementById("boton"+idActivo);
    const fila=document.getElementById("filaSeguimiento"+idActivo);
    if(boton==null || fila==null) return;
    if(boton.innerHTML=="+"){
      boton.innerHTML="-";
      fila.classList.remove("d-none");
    }else{
      fila.classList.add("d-none");
      boton.innerHTML="+";
    }
    
  }
}
