#!/usr/bin/env Deno

import { Db, main, StartUp } from "./deps.ts";

if (import.meta.main) {
  const path = StartUp();
  const db = new Db(path);
  main(Deno.args, db);
}
