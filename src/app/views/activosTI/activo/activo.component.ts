import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective, FormSelectDirective, TableDirective, TableColorDirective, ModalComponent, ModalDialogComponent, ModalToggleDirective, ModalHeaderComponent, ModalBodyComponent, ModalFooterComponent, ButtonCloseDirective, ModalModule, ToastComponent, ToastHeaderComponent, ToastBodyComponent, ProgressBarComponent, ProgressBarDirective, ProgressComponent, ToasterComponent } from '@coreui/angular';
import { ActivoModel } from '../models/activo.model';
import { ActivoService } from '../services/activo.service';
import { ConfirmarEliminacionComponent } from '../compartido/confirmar-eliminacion/confirmar-eliminacion.component';
import { TitularService } from '../services/titular.service';
import { TitularModel } from '../models/titular.model';

@Component({
  selector: 'app-activo',
  standalone: true,
  imports: [RowComponent, ColComponent, TextColorDirective, 
    CardComponent, CardHeaderComponent, CardBodyComponent,  
    ReactiveFormsModule, 
    FormsModule, FormDirective, FormLabelDirective, FormControlDirective, 
    ButtonDirective,     NgStyle, FormSelectDirective,
    TableColorDirective,TableDirective,
    ModalComponent,ModalHeaderComponent,ModalBodyComponent,ModalFooterComponent,ModalToggleDirective,ButtonCloseDirective,
  ToasterComponent,ToastComponent,ToastHeaderComponent,ToastBodyComponent,ProgressBarComponent,ProgressBarDirective,ProgressComponent,
  ConfirmarEliminacionComponent],
  templateUrl: './activo.component.html',
  styleUrl: './activo.component.scss'
})
export class ActivoComponent {
  activos:ActivoModel[]=[];
  activo:ActivoModel=new ActivoModel();
  public visibleModal=false;
  mostrarModalConfirmarEliminar=false;
  titularesLista:TitularModel[]=[];

  constructor(private activoService:ActivoService,private titularService:TitularService) {
    this.mostrarActivos();
    this.llenarComboTitulares();
  }

  //toast
  tituloToast="ACTIVO";
  mensajeToast="hola";
  positionToast = 'top-end';
  visibleToast = false;
  percentageToast = 0;

  onVisibleChange($event: boolean) {
    this.visibleToast = $event;
    this.percentageToast = !this.visibleToast ? 0 : this.percentageToast;
  }

  onTimerChange($event: number) {
    this.percentageToast = $event * 25;
  }
// fin toast

  //modal event
      
  handleLiveDemoChange(event: any) {
    this.visibleModal = event;
  }
  // ==============================================================================
    //LISTAR 
    // ==============================================================================
  mostrarActivos(){
    this.activoService.listar().subscribe({
      next:(res)=>{
        this.activos=res;
      },
      error:(error)=>{
        console.error(error);
      }
    })
  }

  // ==============================================================================
  //guardar crear o actualizar 
  // ==============================================================================
  guardar(){
      if(this.activo._id==""){
        this.crear();
        this.mensajeToast="Se creó el Activo";
      }else{
        //actualizar
        this.mensajeToast="Se modificó el Activo";
        this.modificar();
      }
      this.visibleModal = false;//ocultando modal
      this.visibleToast = true;//mostrando toast mensaje
  }

  // ==============================================================================
  //crear
  // ==============================================================================
  crear(){
    this.activoService.crear(this.activo).subscribe({
      next:(res)=>{
        this.mostrarActivos();
      },
      error:(error)=>{
        console.error(error);
      }
    })
  }

  // ==============================================================================
  //modificar
  // ==============================================================================
  modificar(){
    this.activoService.modificar(this.activo).subscribe({
      next:(res)=>{
        this.mostrarActivos();
      },
      error:(error)=>{
        console.error(error);
      }
    })
  }
 
// ==============================================================================
  //OCULTAR MODAL
  // ==============================================================================
  botonCancelarModal(){
    this.visibleModal=false;
    this.mostrarActivos();// volver a cargar los registros, para descartar los cambios en modal
  }

  // ==============================================================================
  // MOSTRAR FORMULARIO PARA NUEVO REGISTRO
  // ==============================================================================
  mostrarFormularioNuevo(){
    this.activo=new ActivoModel();
    this.visibleModal=true;
  }

  // ==============================================================================
  // MOSTRAR FORMULARIO PARA MODIFICAR REGISTRO
  // ==============================================================================
  mostrarEditar(a:ActivoModel){
    this.activo=a;
    this.visibleModal=true;
  }

  // ==============================================================================
  //mostrar confirmar eliminar
  // ==============================================================================
  mostrarConfirmarEliminar(a:ActivoModel){
    this.activo=a;
    this.mostrarModalConfirmarEliminar=true;
    // cambiando de color fila a eliminar
   this.cambiarfondoFila("pink")
  }

  // ==============================================================================
  //aceptar eliminacion
  // ==============================================================================
  aceptarClickModalEliminar(){
     const fila=document.getElementById("fila"+this.activo._id);
     if(fila==null) return;
     fila.style.opacity = "0";
     fila.style.transition= "1.5s";
     this.activoService.eliminar(this.activo._id).subscribe({
      next:(res)=>{
        //this.mostrarActivos();
        this.cambiarfondoFila("red");
        setTimeout(() => {
          for(let i=0;i<=this.activos.length-1;i++){
            if(this.activos[i]._id==this.activo._id){
              this.activos.splice(i,1);// elimina 1 elemento del vector a partir del indice indicado. esto para no traer todo el listado del servidor
            }
          }    
          fila.remove();        
        }, 1000);
        
      },
      error:(error)=>{
        setTimeout(() => {
          fila.style.opacity = "1";
          fila.style.transition= "1.5s";
          this.cambiarfondoFila("");
        },1000);
        console.error(error);
      }
    })
    this.mostrarModalConfirmarEliminar=false;
  }

  // ==============================================================================
  //cancelar eliminar
  // ==============================================================================
  cancelarClickModalEliminar(){
    this.cambiarfondoFila("");
    this.mostrarModalConfirmarEliminar=false;
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

  // ==============================================================================
  // cambiar fondo de fila de tabla
  // ==============================================================================
  private cambiarfondoFila(color:string){
    document.querySelectorAll<HTMLElement>("#fila"+this.activo._id+" td").forEach(celda => {
      celda.style.backgroundColor=color;
    });
  }


}
