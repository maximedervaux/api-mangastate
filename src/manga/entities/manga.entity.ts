import { Genre } from "src/genre/entities/genre.entity"
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, JoinColumn } from "typeorm"

@Entity()
export class Manga {

    @PrimaryGeneratedColumn()
    id_manga: number

    @Column()
    title_manga: string

    @Column({nullable: true})
    author_manga: string

    @Column({nullable: true})
    description_manga: string

    @Column({nullable: true})
    cover_image_manga : string 

    @Column({nullable: true})
    release_date_manga: Date

    @ManyToMany(()=> Genre,{eager:true})
    @JoinTable()
    genres : Genre[]
    

}