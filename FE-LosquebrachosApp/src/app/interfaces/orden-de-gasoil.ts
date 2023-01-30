import { Camion } from "./camion";
import { Chofer } from "./chofer";
import { Transporte } from "./transporte";

export interface OrdenDeGasoil{
    id?: number,
    numeroOrden?: string,
    fecha: Date,
    chofer: Chofer,
    vehiculo: Camion,
    transporte: Transporte,
    cuitTransporte: string,
    litros: number,
    estacion: string
}