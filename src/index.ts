import { MikroORM } from "@mikro-orm/postgresql";
import { __prod__ } from "./config";

const main = async () => {
  //   const orm = await MikroORM.init({});
  console.log(__prod__);
};

main();
