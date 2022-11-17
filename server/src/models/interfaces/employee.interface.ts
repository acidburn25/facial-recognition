export interface EmployeeInterface {
    id: number;
    documento: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    primerNombre: string;
    segundoNombre: string | null;
    sexo: string | null;
    fechaNacimiento: string | null;
    direccion: string | null;
    telefonoCelular: number | null;
    telefonoFijo: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
}
