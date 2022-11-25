import { Transporte } from "./transporte";

export interface Camion{
    id?: number,
    chasis: string,
    acoplado: string,
    tipo: string,
    capacidadTN: number,
    transporte: Transporte
}