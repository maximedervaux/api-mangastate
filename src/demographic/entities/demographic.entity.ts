import { Column, PrimaryGeneratedColumn } from "typeorm"
import { Entity } from "typeorm/decorator/entity/Entity"

@Entity()
export class Demographic {
    @PrimaryGeneratedColumn()
    id_Demographic: number

    @Column()
    name : string 
}



