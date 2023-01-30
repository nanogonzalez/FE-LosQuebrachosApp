import { Cliente } from "./cliente";
import { DestinoDeCarga } from "./destino-de-carga";
import { DestinoDeDescarga } from "./destino-de-descarga";

export interface OrdenDeCarga{
    id?: number,
    numeroOrden?: string,
    destinoDeCarga: DestinoDeCarga,
    destinoDeDescarga: DestinoDeDescarga,
    distanciaViaje: number,
    diaHoraCarga: Date,
    tipoMercaderia: string,
    cliente: Cliente
}