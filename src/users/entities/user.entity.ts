import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, JoinColumn, ManyToOne, Unique } from "typeorm"

@Entity()
@Unique(["username"])
export class User {

    @PrimaryGeneratedColumn()
    id_user: number

    @Column()
    username: string

    @Column()
    password: string


}