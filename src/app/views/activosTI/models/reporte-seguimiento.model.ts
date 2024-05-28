export class ReporteSeguimientoModel{
    cantidad_activos: number=0;
    seguimientoActivos: [
        {   
            activo:{
                _id:string;
                descripcion:string;
                caracteristicas:string;
            };
            totalSeguimientos:number;
            seguimientos:[{
                _id:string;
                fecha:Date|null;
                movimiento:string;
                descripcion:string;
            }];
        }
    ]|any;
}

