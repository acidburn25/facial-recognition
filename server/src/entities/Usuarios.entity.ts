import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Empleado } from "./Empleado.entity";

@Index("documento", ["documento"], {})
@Entity("usuarios", { schema: "eaglessafety" })
export class Usuarios {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "documento", length: 20 })
  documento: string;

  @Column("varchar", { name: "usuario", length: 20 })
  usuario: string;

  @Column("varchar", { name: "contrasena", length: 20 })
  contrasena: string;

  @Column("timestamp", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @Column("timestamp", {
    name: "updated_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date | null;

  @ManyToOne(() => Empleado, (empleado) => empleado.usuarios, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "documento", referencedColumnName: "documento" }])
  documento2: Empleado;
}
