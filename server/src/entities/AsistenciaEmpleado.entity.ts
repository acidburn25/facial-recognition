import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Empleado } from './Empleado.entity';

@Index('documento', ['documento'], {})
@Entity('asistencia_empleado', { schema: 'eaglessafety' })
export class AsistenciaEmpleado {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('varchar', { name: 'documento', length: 20 })
    documento: string;

    @Column('datetime', { name: 'fecha_hora_entrada' })
    fechaHoraEntrada: Date;

    @Column('datetime', { name: 'fecha_hora_salida' })
    fechaHoraSalida: Date;

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

    @ManyToOne(() => Empleado, (empleado) => empleado.asistenciaEmpleados, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    })
    @JoinColumn([{ name: 'documento', referencedColumnName: 'documento' }])
    documento2: Empleado;
}
