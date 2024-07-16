import { Theme } from './../../theme/entities/theme.entity';
import { Auteur } from "src/auteur/entities/auteur.entity"
import { Demographic } from 'src/demographic/entities/demographic.entity';
import { Genre } from "src/genre/entities/genre.entity"
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, JoinColumn, ManyToOne, Unique } from "typeorm"

@Entity()
@Unique(["title_manga","auteurs"])
export class Manga {

    @PrimaryGeneratedColumn()
    id_manga: number

    @Column()
    title_manga: string

    @Column({nullable: true,length: 3000})
    description_manga: string

    @Column({nullable: true})
    cover_image_manga : string 

    @ManyToMany(()=> Genre,{eager:true})
    @JoinTable()
    genres : Genre[]

    @ManyToMany(()=> Theme,{eager:true , nullable:true})
    @JoinTable()
    themes : Theme[]

    @ManyToMany(()=> Demographic,{eager:true , nullable:true})
    @JoinTable()
    demographics : Demographic[]

    @ManyToMany(()=>Auteur,{eager:true , nullable:true})
    @JoinTable()
    auteurs: Auteur[]

    @Column({nullable:true})
    chapter: number
    
    @Column({nullable:true})
    status : string
    
    @Column({nullable:true})
    date_deb : Date

    @Column({nullable:true})
    date_fin : Date

    




}