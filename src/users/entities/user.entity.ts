import { Manga } from './../../manga/entities/manga.entity';
import { Tome } from './../../tomes/entities/tome.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, JoinColumn, ManyToOne, Unique } from "typeorm"

@Entity()
@Unique(["username"])
export class User {

    @PrimaryGeneratedColumn()
    id_user: number

    @Column({nullable:true})
    email: string
    
    @Column()
    username: string

    @Column()
    password: string

    @ManyToMany(() => Manga, (manga) => manga.users)  
    @JoinTable()  
    mangas: Manga[];

    @Column({nullable:true})
    profilePicture : string

    @Column({nullable:true})
    birthday : Date 


}