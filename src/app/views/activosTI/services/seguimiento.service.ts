import {HttpClient} from "@angular/common/http"
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SeguimientoModel } from "../models/seguimiento.model";
import { ReporteSeguimientoModel } from "../models/reporte-seguimiento.model";
//import { ServiceAbstract } from "./interface.service";



@Injectable({
    providedIn:'root'
})

export class SeguimientoService{
    //URL BACKEND
    private URL_API_BASE='http://localhost:5000/seguimiento';
    //private URL_LISTAR_ACTIVOS=URL_API_BASE+"/seguimientos/listar";
    constructor(private http:HttpClient){       
    }

    // ==============================================================================
    //LISTAR 
    // ==============================================================================
    listar():Observable<SeguimientoModel[]>{
        return this.http.get<SeguimientoModel[]>(this.URL_API_BASE+"/listar")
    }

    // ==============================================================================
    // CREAR
    // ==============================================================================
    crear(seguimiento:SeguimientoModel):Observable<SeguimientoModel>{
        return this.http.post<SeguimientoModel>(this.URL_API_BASE+"/crear",seguimiento);
    }
    // ==============================================================================
    // MODIFICAR
    // ==============================================================================

    modificar(seguimiento:SeguimientoModel):Observable<SeguimientoModel>{
        return this.http.put<SeguimientoModel>(this.URL_API_BASE+"/modificar/"+seguimiento._id,seguimiento);
    }

    // ==============================================================================
    // ELIMINAR
    // ==============================================================================
    
    eliminar(id:string):Observable<SeguimientoModel>{
        return this.http.delete<SeguimientoModel>(this.URL_API_BASE+"/eliminar/"+id);
    }

    // ==============================================================================
    // LISTA DE ACTIVOS POR ID TITULAR
    // ==============================================================================
    reporteSeguimientoActivos(id:string):Observable<ReporteSeguimientoModel>{
        return this.http.get<ReporteSeguimientoModel>(this.URL_API_BASE+"/reporte-seguimiento-activos/"+id);
    }

}