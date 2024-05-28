import { TitularModel } from './titular.model';
export class ReporteActivosTitularModel{
    cantidadActivos: number=0;
    activos: [
        {_id:string;
            correlativo:number;
            codigo:string;
            tipo:string;
            descripcion:string;
            marca:string;
            modelo:string;
            caracteristicas:string;
            color:string;
            fecha_compra:Date|null;
            fecha_baja:Date|null;
            precio_bs:number;
            estado:string;
            titular: TitularModel
        }
    ]|any;
}

