import {HttpClient} from "@angular/common/http"
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ActivoModel } from "../models/activo.model";
//import { ServiceAbstract } from "./interface.service";



@Injectable({
    providedIn:'root'
})

export class ActivoService{
    //URL BACKEND
    private URL_API_BASE='http://localhost:5000/activos';
    //private URL_LISTAR_ACTIVOS=URL_API_BASE+"/activos/listar";
    constructor(private http:HttpClient){       
    }

    // ==============================================================================
    //LISTAR 
    // ==============================================================================
    listar():Observable<ActivoModel[]>{
        return this.http.get<ActivoModel[]>(this.URL_API_BASE+"/listar")
    }

    // ==============================================================================
    // CREAR
    // ==============================================================================
    crear(activo:ActivoModel):Observable<ActivoModel>{
        return this.http.post<ActivoModel>(this.URL_API_BASE+"/crear",activo);
    }
    // ==============================================================================
    // MODIFICAR
    // ==============================================================================

    modificar(activo:ActivoModel):Observable<ActivoModel>{
        return this.http.put<ActivoModel>(this.URL_API_BASE+"/modificar/"+activo._id,activo);
    }

    // ==============================================================================
    // ELIMINAR
    // ==============================================================================
    
    eliminar(id:string):Observable<ActivoModel>{
        return this.http.delete<ActivoModel>(this.URL_API_BASE+"/eliminar/"+id);
    }

}