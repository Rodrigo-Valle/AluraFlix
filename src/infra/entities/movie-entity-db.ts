import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "movie" })
export class MovieEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  url!: string;
}
