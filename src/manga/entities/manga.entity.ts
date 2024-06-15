import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Manga {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    author: string

    @Column()
    description: string

    @Column()
    cover_image : string 

    @Column()
    release_date: Date
    

}