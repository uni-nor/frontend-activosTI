export class ActivoModel{
    _id:string="";
    correlativo:number=0;
    codigo:string="";
    tipo:string="";
    descripcion:string="";
    marca:string="";
    modelo:string="";
    caracteristicas:string="";
    color:string="";
    fecha_compra:Date|null=null;
    fecha_baja:Date|null=null;
    precio_bs:number=0;
    estado:string="";
    titular:string="";
}