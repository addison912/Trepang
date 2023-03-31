import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";
import { Request } from "express";
import { Session } from "express-session";

export type MyContext = {
  em: EntityManager<IDatabaseDriver<Connection>>;
  req: Request & { session: Session & { userId: number } };
  res: Response;
};
