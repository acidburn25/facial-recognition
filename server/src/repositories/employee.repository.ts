import { EntityRepository, Repository } from "typeorm";
import { Empleado } from "../entities/Empleado.entity";

@EntityRepository(Empleado)
export class EmpleadoRepository extends Repository<Empleado> {
    
}