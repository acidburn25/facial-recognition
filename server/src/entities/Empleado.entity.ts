import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AsistenciaEmpleado } from './AsistenciaEmpleado.entity';

@Index('documento', ['documento'], { unique: true })
@Entity('empleado', { schema: 'eaglessafety' })
export class Empleado {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('varchar', { name: 'documento', unique: true, length: 20 })
    documento: string;

    @Column('varchar', { name: 'apellido_paterno', length: 20 })
    apellidoPaterno: string;

    @Column('varchar', { name: 'apellido_materno', length: 20 })
    apellidoMaterno: string;

    @Column('varchar', { name: 'primer_nombre', length: 20 })
    primerNombre: string;

    @Column('varchar', { name: 'segundo_nombre', nullable: true, length: 20 })
    segundoNombre: string | null;

    @Column('varchar', { name: 'sexo', nullable: true, length: 1 })
    sexo: string | null;

    @Column('date', { name: 'fecha_nacimiento', nullable: true })
    fechaNacimiento: string | null;

    @Column('varchar', { name: 'direccion', nullable: true, length: 70 })
    direccion: string | null;

    @Column('int', { name: 'telefono_celular', nullable: true })
    telefonoCelular: number | null;

    @Column('int', { name: 'telefono_fijo', nullable: true })
    telefonoFijo: number | null;

    @Column('timestamp', {
        name: 'created_at',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date | null;

    @Column('timestamp', {
        name: 'updated_at',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date | null;

    @OneToMany(() => AsistenciaEmpleado, (asistenciaEmpleado) => asistenciaEmpleado.documento2)
    asistenciaEmpleados: AsistenciaEmpleado[];
}
