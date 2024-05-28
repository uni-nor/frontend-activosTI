import {HttpClient} from "@angular/common/http"
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UbicacionModel } from "../models/ubicacion.model";
//import { ServiceAbstract } from "./interface.service";



@Injectable({
    providedIn:'root'
})

export class UbicacionService{
    //URL BACKEND
    private URL_API_BASE='http://localhost:5000/ubicacion';
    //private URL_LISTAR_ACTIVOS=URL_API_BASE+"/ubicaciones/listar";
    constructor(private http:HttpClient){       
    }

    // ==============================================================================
    //LISTAR 
    // ==============================================================================
    listar():Observable<UbicacionModel[]>{
        return this.http.get<UbicacionModel[]>(this.URL_API_BASE+"/listar")
    }

    // ==============================================================================
    // CREAR
    // ==============================================================================
    crear(ubicacion:UbicacionModel):Observable<UbicacionModel>{
        return this.http.post<UbicacionModel>(this.URL_API_BASE+"/crear",ubicacion);
    }
    // ==============================================================================
    // MODIFICAR
    // ==============================================================================

    modificar(ubicacion:UbicacionModel):Observable<UbicacionModel>{
        return this.http.put<UbicacionModel>(this.URL_API_BASE+"/modificar/"+ubicacion._id,ubicacion);
    }

    // ==============================================================================
    // ELIMINAR
    // ==============================================================================
    
    eliminar(id:string):Observable<UbicacionModel>{
        return this.http.delete<UbicacionModel>(this.URL_API_BASE+"/eliminar/"+id);
    }

}