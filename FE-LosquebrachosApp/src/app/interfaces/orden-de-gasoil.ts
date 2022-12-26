import { Camion } from "./camion";
import { Chofer } from "./chofer";
import { Transporte } from "./transporte";

export interface OrdenDeGasoil{
    id?: number,
    numeroOrden: number,
    fecha: Date,
    chofer: Chofer,
    chasis: Camion,
    transporte: Transporte,
    cuitTransporte: number,
    litros: number,
    estacion: string
}