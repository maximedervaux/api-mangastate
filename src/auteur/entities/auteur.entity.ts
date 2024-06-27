import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Auteur {
    
    @PrimaryGeneratedColumn()
    id_auteur: number

    @Column()
    name : string 

}
