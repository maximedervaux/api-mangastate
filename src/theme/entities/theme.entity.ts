import internal from "stream";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Theme {
    @PrimaryGeneratedColumn()
    id_theme: number

    @Column()
    name : string
    
}
