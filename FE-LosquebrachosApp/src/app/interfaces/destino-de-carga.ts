import { Cliente } from "./cliente";

export interface DestinoDeCarga{
    id?: number,
    latitud: number,
    longitud: number,
    nombreEstablecimiento: string,
    cliente: Cliente
}