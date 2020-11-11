import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm";

import Usuarios from "./Usuarios";

@Entity("agendamentos")
class Agendamentos {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Usuarios)
    @JoinColumn({ name: "prestador_servico_id" })
    prestador_servico: Usuarios;

    @Column()
    prestador_servico_id: string;

    @Column("time with time zone")
    data: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Agendamentos;
