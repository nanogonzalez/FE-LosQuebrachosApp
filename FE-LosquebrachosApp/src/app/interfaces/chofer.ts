import { Transporte } from "./transporte";

export interface Chofer{
    id?: number,
    nombre: string,
    apellido: string,
    cuit: string,
    transporte: Transporte
}