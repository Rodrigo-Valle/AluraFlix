import "./config/module-alias";
import "reflect-metadata";
import { app } from "@/main/config/app";
import { env } from "@/main/config/env";
import { PostgresDataSource } from "@/infra/database/pg-datasource";

PostgresDataSource.initialize()
  .then(() => {
    app.listen(env.port, () => console.log(`server running at http://localhost:${env.port}`));
  })
  .catch((e) => {
    console.error(e);
  });

// init
