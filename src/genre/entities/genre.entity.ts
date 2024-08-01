import { Manga } from "src/manga/entities/manga.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Genre {

    @PrimaryGeneratedColumn()
    id_genre: number

    @Column()
    name_genre: string

    @Column({default: false})
    sensible_genre: boolean

    @ManyToMany(() => Manga, manga => manga.genres)
    mangas: Manga[];
}
