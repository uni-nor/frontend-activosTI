import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective, FormSelectDirective, TableDirective, TableColorDirective, ModalComponent, ModalDialogComponent, ModalToggleDirective, ModalHeaderComponent, ModalBodyComponent, ModalFooterComponent, ButtonCloseDirective, ModalModule, ToastComponent, ToastHeaderComponent, ToastBodyComponent, ProgressBarComponent, ProgressBarDirective, ProgressComponent, ToasterComponent } from '@coreui/angular';
import { UbicacionModel } from '../models/ubicacion.model';
import { UbicacionService } from '../services/ubicacion.service';
import { ConfirmarEliminacionComponent } from '../compartido/confirmar-eliminacion/confirmar-eliminacion.component';

@Component({
  selector: 'app-ubicacion',
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
  templateUrl: './ubicacion.component.html',
  styleUrl: './ubicacion.component.scss'
})
export class UbicacionComponent {
  ubicaciones:UbicacionModel[]=[];
  ubicacion:UbicacionModel=new UbicacionModel();
  public visibleModal=false;
  mostrarModalConfirmarEliminar=false;
  constructor(private ubicacionService:UbicacionService) {
    this.mostrarUbicaciones();
  }

  //toast
  tituloToast="UBICACION";
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
  mostrarUbicaciones(){
    this.ubicacionService.listar().subscribe({
      next:(res)=>{
        this.ubicaciones=res;
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
      if(this.ubicacion._id==""){
        this.crear();
        this.mensajeToast="Se creó la Ubicacion";
      }else{
        //actualizar
        this.mensajeToast="Se modificó la Ubicacion";
        this.modificar();
      }
      this.visibleModal = false;//ocultando modal
      this.visibleToast = true;//mostrando toast mensaje
  }

  // ==============================================================================
  //crear
  // ==============================================================================
  crear(){
    this.ubicacionService.crear(this.ubicacion).subscribe({
      next:(res)=>{
        this.mostrarUbicaciones();
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
    this.ubicacionService.modificar(this.ubicacion).subscribe({
      next:(res)=>{
        this.mostrarUbicaciones();
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
    this.mostrarUbicaciones();// volver a cargar los registros, para descartar los cambios en modal
  }

  // ==============================================================================
  // MOSTRAR FORMULARIO PARA NUEVO REGISTRO
  // ==============================================================================
  mostrarFormularioNuevo(){
    this.ubicacion=new UbicacionModel();
    this.visibleModal=true;
  }

  // ==============================================================================
  // MOSTRAR FORMULARIO PARA MODIFICAR REGISTRO
  // ==============================================================================
  mostrarEditar(a:UbicacionModel){
    this.ubicacion=a;
    this.visibleModal=true;
  }

  // ==============================================================================
  //eliminar
  // ==============================================================================
  mostrarConfirmarEliminar(a:UbicacionModel){
    this.ubicacion=a;
    this.mostrarModalConfirmarEliminar=true;
    // cambiando de color fila a eliminar
   this.cambiarfondoFila("pink")
  }

  aceptarClickModalEliminar(){
      const fila=document.getElementById("fila"+this.ubicacion._id);
      if(fila==null) return;
      fila.style.opacity = "0";
      fila.style.transition= "1.5s";
      this.ubicacionService.eliminar(this.ubicacion._id).subscribe({
      next:(res)=>{
        //this.mostrarActivos();
        this.cambiarfondoFila("red");
        setTimeout(() => {
          for(let i=0;i<=this.ubicaciones.length-1;i++){
            if(this.ubicaciones[i]._id==this.ubicacion._id){
              this.ubicaciones.splice(i,1);// elimina 1 elemento del vector a partir del indice indicado. esto para no traer todo el listado del servidor
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

  cancelarClickModalEliminar(){
    this.cambiarfondoFila("");
    this.mostrarModalConfirmarEliminar=false;
  }


  private cambiarfondoFila(color:string){
    document.querySelectorAll<HTMLElement>("#fila"+this.ubicacion._id+" td").forEach(celda => {
      celda.style.backgroundColor=color;
    });
  }


}
