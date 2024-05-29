import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective, FormSelectDirective, TableDirective, TableColorDirective, ModalComponent, ModalDialogComponent, ModalToggleDirective, ModalHeaderComponent, ModalBodyComponent, ModalFooterComponent, ButtonCloseDirective, ModalModule, ToastComponent, ToastHeaderComponent, ToastBodyComponent, ProgressBarComponent, ProgressBarDirective, ProgressComponent, ToasterComponent } from '@coreui/angular';
import { SeguimientoModel } from '../models/seguimiento.model';
import { SeguimientoService } from '../services/seguimiento.service';
import { ConfirmarEliminacionComponent } from '../compartido/confirmar-eliminacion/confirmar-eliminacion.component';
import { ActivoService } from '../services/activo.service';
import { ActivoModel } from '../models/activo.model';
import { UbicacionModel } from '../models/ubicacion.model';
import { UbicacionService } from '../services/ubicacion.service';

@Component({
  selector: 'app-seguimiento',
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
  templateUrl: './seguimiento.component.html',
  styleUrl: './seguimiento.component.scss'
})
export class SeguimientoComponent {
  seguimientos:SeguimientoModel[]=[];
  seguimiento:SeguimientoModel=new SeguimientoModel();
  public visibleModal=false;
  mostrarModalConfirmarEliminar=false;

  activosLista:ActivoModel[]=[];
  ubicacionLista:UbicacionModel[]=[];
  constructor(private seguimientoService:SeguimientoService,private activoService:ActivoService,private ubicacionService:UbicacionService) {
    this.mostrarSeguimientos();
    this.llenarComboActivos();
    this.llenarComboUbicacion();
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

   // ==============================================================================
  //llenar combo titular para combo
  // ==============================================================================
  private llenarComboUbicacion(){
    this.ubicacionService.listar().subscribe({
      next:(res)=>{
        this.ubicacionLista=res;
      },
      error:(error)=>{
        console.error(error)
      }
    });
  }

  //toast
  tituloToast="SEGUIMIENTO";
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
  mostrarSeguimientos(){
    this.seguimientoService.listar().subscribe({
      next:(res)=>{
        this.seguimientos=res;
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
      if(this.seguimiento._id==""){
        this.crear();
        this.mensajeToast="Se creó el Seguimiento";
      }else{
        //actualizar
        this.mensajeToast="Se modificó el Seguimiento";
        this.modificar();
      }
      this.visibleModal = false;//ocultando modal
      this.visibleToast = true;//mostrando toast mensaje
  }

  // ==============================================================================
  //crear
  // ==============================================================================
  crear(){
    console.log(this.seguimiento);
    this.seguimiento.usuario="664e9b3427820bd9a468f203";
    this.seguimientoService.crear(this.seguimiento).subscribe({
      next:(res)=>{
        this.mostrarSeguimientos();
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
    this.seguimientoService.modificar(this.seguimiento).subscribe({
      next:(res)=>{
        this.mostrarSeguimientos();
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
    this.mostrarSeguimientos();// volver a cargar los registros, para descartar los cambios en modal
  }

  // ==============================================================================
  // MOSTRAR FORMULARIO PARA NUEVO REGISTRO
  // ==============================================================================
  mostrarFormularioNuevo(){
    this.seguimiento=new SeguimientoModel();
    this.visibleModal=true;
  }

  // ==============================================================================
  // MOSTRAR FORMULARIO PARA MODIFICAR REGISTRO
  // ==============================================================================
  mostrarEditar(x:SeguimientoModel){
    this.seguimiento=x;
    this.visibleModal=true;
  }

  // ==============================================================================
  //eliminar
  // ==============================================================================
  mostrarConfirmarEliminar(x:SeguimientoModel){
    this.seguimiento=x;
    this.mostrarModalConfirmarEliminar=true;
    // cambiando de color fila a eliminar
   this.cambiarfondoFila("pink")
  }

  aceptarClickModalEliminar(){
      const fila=document.getElementById("fila"+this.seguimiento._id);
      if(fila==null) return;
      fila.style.opacity = "0";
      fila.style.transition= "1.5s";
      this.seguimientoService.eliminar(this.seguimiento._id).subscribe({
      next:(res)=>{
        //this.mostrarActivos();
        this.cambiarfondoFila("red");
        setTimeout(() => {
          for(let i=0;i<=this.seguimientos.length-1;i++){
            if(this.seguimientos[i]._id==this.seguimiento._id){
              this.seguimientos.splice(i,1);// elimina 1 elemento del vector a partir del indice indicado. esto para no traer todo el listado del servidor
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
    document.querySelectorAll<HTMLElement>("#fila"+this.seguimiento._id+" td").forEach(celda => {
      celda.style.backgroundColor=color;
    });
  }


}
