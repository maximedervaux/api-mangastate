import { Manga } from "src/manga/entities/manga.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Tome {

    @PrimaryGeneratedColumn()
    id_tome : number

    @Column()
    libelle_tome : string

    @Column()
    cover_image_link: string

    @ManyToOne(() => Manga , (manga)=> manga.tomes)
    manga: Manga
}
