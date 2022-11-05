import { Time } from "@angular/common";

export interface OrdenDeCarga{
    id?: number,
    destinoCarga: string,
    destinoDescarga: string,
    diaHoraCarga: Date,
    tipoMercaderia: string
}