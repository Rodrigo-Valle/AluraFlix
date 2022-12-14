import { DataSource } from "typeorm";
import { MovieEntity } from "@/infra/entities";

export const PostgresDataSource = new DataSource({
  type: "postgres",
  host: "alura-flix.postgres.database.azure.com",
  port: 5432,
  username: "rodrigo",
  password: "/Abc123456",
  database: "alura-flix",
  entities: [MovieEntity],
  synchronize: true,
  uuidExtension: "pgcrypto"
});
