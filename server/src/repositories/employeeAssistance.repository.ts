import { AsistenciaEmpleado } from "../entities/AsistenciaEmpleado.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(AsistenciaEmpleado)
export class AsistenciaEmpleadoRepository extends Repository<AsistenciaEmpleado> {
    
}