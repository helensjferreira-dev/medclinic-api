import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum UserRole {
    ADMIN = 'Administrador',
    ATENDENTE = 'Atendente',
    MEDICO = 'Médico',
    PACIENTE = 'Paciente'
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({type: 'varchar', length: 150})
    name!: string;

    @Column({ type:'varchar', length: 150, unique: true})
    email!: string;

    @Column({type: 'varchar', length: 255})
    password!: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.ATENDENTE
    })
    role!: UserRole;

    @CreateDateColumn({name: 'created_at'})
    createdAt!: Date;
}