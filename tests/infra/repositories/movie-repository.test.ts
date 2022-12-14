/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { MovieEntity } from "@/infra/entities";
import { MovieRepository } from "@/infra/repositories";

import { DataType, IBackup, newDb, IMemoryDb } from "pg-mem";
import { DataSource } from "typeorm";
import { v4 } from "uuid";

const addMovieDTO = {
  title: "any_title",
  description: "any_description",
  url: "any_url"
};

describe("MovieRepository tests", () => {
  let sut: MovieRepository;
  let backup: IBackup;
  let db: IMemoryDb;
  let dataSource: DataSource;

  beforeAll(async () => {
    db = newDb({ autoCreateForeignKeyIndices: true });

    db.public.registerFunction({
      name: "current_database",
      args: [],
      returns: DataType.text,
      implementation: (x: any) => `hello world: ${x}`
    });

    db.public.registerFunction({
      name: "version",
      args: [],
      returns: DataType.text,
      implementation: (x: any) => `hello world: ${x}`
    });

    db.registerExtension("uuid-ossp", (schema: any) => {
      schema.registerFunction({
        name: "uuid_generate_v4",
        returns: DataType.uuid,
        implementation: v4,
        impure: true
      });
    });

    dataSource = db.adapters.createTypeormDataSource({
      type: "postgres",
      entities: [MovieEntity]
    });

    await dataSource.initialize();
    await dataSource.synchronize();
    backup = db.backup();
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  beforeEach(() => {
    backup.restore();
    sut = new MovieRepository(dataSource);
  });

  describe("Add method", () => {
    test("should create and return a movie", async () => {
      const movie = await sut.add(addMovieDTO);

      expect(movie.id).toBeTruthy();
    });
  });
});
