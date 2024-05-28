import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective, FormSelectDirective, TableDirective, TableColorDirective, ModalComponent, ModalDialogComponent, ModalToggleDirective, ModalHeaderComponent, ModalBodyComponent, ModalFooterComponent, ButtonCloseDirective, ModalModule, ToastComponent, ToastHeaderComponent, ToastBodyComponent, ProgressBarComponent, ProgressBarDirective, ProgressComponent, ToasterComponent } from '@coreui/angular';
import { TitularModel } from '../models/titular.model';
import { TitularService } from '../services/titular.service';
import { ConfirmarEliminacionComponent } from '../compartido/confirmar-eliminacion/confirmar-eliminacion.component';

@Component({
  selector: 'app-titular',
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
  templateUrl: './titular.component.html',
  styleUrl: './titular.component.scss'
})
export class TitularComponent {
  titulares:TitularModel[]=[];
  titular:TitularModel=new TitularModel();
  public visibleModal=false;
  mostrarModalConfirmarEliminar=false;
  constructor(private titularService:TitularService) {
    this.mostrarTitulares();
  }

  //toast
  tituloToast="TITULAR";
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
  mostrarTitulares(){
    this.titularService.listar().subscribe({
      next:(res)=>{
        this.titulares=res;
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
      if(this.titular._id==""){
        this.crear();
        this.mensajeToast="Se creó el Titular";
      }else{
        //actualizar
        this.mensajeToast="Se modificó el Titular";
        this.modificar();
      }
      this.visibleModal = false;//ocultando modal
      this.visibleToast = true;//mostrando toast mensaje
  }

  // ==============================================================================
  //crear
  // ==============================================================================
  crear(){
    this.titularService.crear(this.titular).subscribe({
      next:(res)=>{
        this.mostrarTitulares();
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
    this.titularService.modificar(this.titular).subscribe({
      next:(res)=>{
        this.mostrarTitulares();
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
    this.mostrarTitulares();// volver a cargar los registros, para descartar los cambios en modal
  }

  // ==============================================================================
  // MOSTRAR FORMULARIO PARA NUEVO REGISTRO
  // ==============================================================================
  mostrarFormularioNuevo(){
    this.titular=new TitularModel();
    this.visibleModal=true;
  }

  // ==============================================================================
  // MOSTRAR FORMULARIO PARA MODIFICAR REGISTRO
  // ==============================================================================
  mostrarEditar(a:TitularModel){
    this.titular=a;
    this.visibleModal=true;
  }

  // ==============================================================================
  //eliminar
  // ==============================================================================
  mostrarConfirmarEliminar(a:TitularModel){
    this.titular=a;
    this.mostrarModalConfirmarEliminar=true;
    // cambiando de color fila a eliminar
   this.cambiarfondoFila("pink")
  }

  aceptarClickModalEliminar(){
      const fila=document.getElementById("fila"+this.titular._id);
      if(fila==null) return;
      fila.style.opacity = "0";
      fila.style.transition= "1.5s";
      this.titularService.eliminar(this.titular._id).subscribe({
      next:(res)=>{
        //this.mostrarActivos();
        this.cambiarfondoFila("red");
        setTimeout(() => {
          for(let i=0;i<=this.titulares.length-1;i++){
            if(this.titulares[i]._id==this.titular._id){
              this.titulares.splice(i,1);// elimina 1 elemento del vector a partir del indice indicado. esto para no traer todo el listado del servidor
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
    document.querySelectorAll<HTMLElement>("#fila"+this.titular._id+" td").forEach(celda => {
      celda.style.backgroundColor=color;
    });
  }


}
