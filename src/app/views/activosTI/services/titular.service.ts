import {HttpClient} from "@angular/common/http"
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TitularModel } from "../models/titular.model";
//import { ServiceAbstract } from "./interface.service";



@Injectable({
    providedIn:'root'
})

export class TitularService{
    //URL BACKEND
    private URL_API_BASE='http://localhost:5000/titular';
    
    constructor(private http:HttpClient){}

    // ==============================================================================
    //LISTAR 
    // ==============================================================================
    listar():Observable<TitularModel[]>{
        return this.http.get<TitularModel[]>(this.URL_API_BASE+"/listar")
    }

    // ==============================================================================
    // CREAR
    // ==============================================================================
    crear(titular:TitularModel):Observable<TitularModel>{
        return this.http.post<TitularModel>(this.URL_API_BASE+"/crear",titular);
    }
    // ==============================================================================
    // MODIFICAR
    // ==============================================================================

    modificar(titular:TitularModel):Observable<TitularModel>{
        return this.http.put<TitularModel>(this.URL_API_BASE+"/modificar/"+titular._id,titular);
    }

    // ==============================================================================
    // ELIMINAR
    // ==============================================================================
    
    eliminar(id:string):Observable<TitularModel>{
        return this.http.delete<TitularModel>(this.URL_API_BASE+"/eliminar/"+id);
    }

}