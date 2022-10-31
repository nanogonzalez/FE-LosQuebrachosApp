import { Time } from "@angular/common";

export interface OrdenDeCarga{
    id?: number,
    destinoCarga: string,
    destinoDescarga: string,
    diaCarga: Date,
    horaCarga: Date,
    tipoMercaderia: string
}