import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective, FormSelectDirective, TableDirective, TableColorDirective, ModalComponent, ModalDialogComponent, ModalToggleDirective, ModalHeaderComponent, ModalBodyComponent, ModalFooterComponent, ButtonCloseDirective, ModalModule, ToastComponent, ToastHeaderComponent, ToastBodyComponent, ProgressBarComponent, ProgressBarDirective, ProgressComponent, ToasterComponent } from '@coreui/angular';
import { ActivoModel } from '../models/activo.model';
import { ActivoService } from '../services/activo.service';
import { ConfirmarEliminacionComponent } from '../compartido/confirmar-eliminacion/confirmar-eliminacion.component';

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
  constructor(private activoService:ActivoService,private confirmarEliminacionComponent:ConfirmarEliminacionComponent) {
    this.mostrarActivos();
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
  //eliminar
  // ==============================================================================
  mostrarConfirmarEliminar(a:ActivoModel){
    this.activo=a;
    this.mostrarModalConfirmarEliminar=true;
    // cambiando de color fila a eliminar
   this.cambiarfondoFila("pink")
  }

  aceptarClickModalEliminar(){
     const fila=document.getElementById("filaAct"+this.activo._id);
     this.activoService.eliminar(this.activo._id+"a").subscribe({
      next:(res)=>{
        //this.mostrarActivos();
        if(fila==null) return;
        this.cambiarfondoFila("red");
        fila.style.opacity = "0";
        fila.style.transition= "1.5s";
        setTimeout(() => {
          for(let i=0;i<=this.activos.length-1;i++){
            if(this.activos[i]._id==this.activo._id){
              this.activos.splice(i,1);// elimina 1 elemento del vector a partir del indice indicado. esto para no traer todo el listado del servidor
            }
          }    
          fila.remove()        
        }, 1000);
        
      },
      error:(error)=>{
        this.cambiarfondoFila("");
        console.error(error);
      }
    })
    this.mostrarModalConfirmarEliminar=false;
  }

  cancelarClickModalEliminar(){
    this.cambiarfondoFila("");
    this.mostrarModalConfirmarEliminar=false;
  }


  private cambiarfondoFila(color:string){
    document.querySelectorAll<HTMLElement>("#filaAct"+this.activo._id+" td").forEach(celda => {
      celda.style.backgroundColor=color;
    });
  }


}
