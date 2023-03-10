import { Usuarios as Users } from '../../entities/Usuarios.entity';
import { UsersEmployeeDto } from '../../facial-recognition/dto/usersEmployee.dto';
import { UsersEmployeeInterface } from '../interfaces';

export class CreateUserEmployeeDB {
	constructor(usersEmployeeDto: UsersEmployeeDto | UsersEmployeeInterface) {
		const user: Users = new Users();

		user.documento = usersEmployeeDto.document;
		user.usuario = usersEmployeeDto.user;
		user.contrasena = usersEmployeeDto.pwd;

		return user;
	}
}
