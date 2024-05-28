import { Component, Input,EventEmitter,Output } from '@angular/core';
import { ModalComponent, ModalHeaderComponent, ModalBodyComponent, ModalFooterComponent, ModalToggleDirective, ButtonCloseDirective, RowComponent, ColComponent, ButtonDirective } from '@coreui/angular';


@Component({
  selector: 'app-confirmar-eliminacion',
  standalone: true,
  imports: [RowComponent,ColComponent,
    ButtonDirective,
    ModalComponent,ModalHeaderComponent,ModalBodyComponent,ModalFooterComponent,ModalToggleDirective,ButtonCloseDirective],
  templateUrl: './confirmar-eliminacion.component.html',
  styleUrl: './confirmar-eliminacion.component.scss'
})
export class ConfirmarEliminacionComponent {
  
  @Input() id:string="";
  @Input() mostrarModalConfirmarEliminar:boolean=false;
  
  @Output() mostrarModalConfirmarEliminarChange=new EventEmitter<boolean>();
  @Output() aceptarClick=new EventEmitter();
  @Output() cancelarClick=new EventEmitter();
  //public visibleModalEliminar=false;
  
  constructor() {

    }

  //====== CONFIRMAR ELIMINACION ==================================
  eliminar(){
      this.aceptarClick.emit();
  }
 
  // //====== CONFIRMAR ELIMINACION ==================================
  ocultarModalEliminar(){
      this.cancelarClick.emit();
  }

}
