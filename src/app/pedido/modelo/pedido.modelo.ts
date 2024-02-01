import { Carro } from "src/app/carro/modelo/carro.modelo";
import { Cliente } from "src/app/cliente/modelo/cliente.modelo";

export class Pedido{
    codigo_ped: string;
    status_ped: number;
    codcli_ped: Cliente;
    codcar_ped: Carro;
    datcon_ped: string;
    datdev_ped: string;
}