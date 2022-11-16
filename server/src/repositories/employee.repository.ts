import { EntityRepository, Repository } from "typeorm";
import { Empleado as Employee } from "../entities/Empleado.entity";

@EntityRepository(Employee)
export class EmployeeRepository extends Repository<Employee> {
    
}