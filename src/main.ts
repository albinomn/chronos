import { Db, match } from "./deps.ts";

export function main(args: string[], db: Db) {
  let [firstParam, ...secondParam] = args;
  if (secondParam.length === 0) {
    secondParam = ["default_task"];
  }
  const command = firstParam.replace("-", "");
  const taskName = secondParam.toString().replace(",", "_");
  match(command, [
    ["-start", () => db.setTask(taskName)],
    ["s", () => db.setTask(taskName)],
    ["-finish", () => db.stopTask(taskName)],
    ["f", () => db.stopTask(taskName)],
    [
      "default",
      () => {
        console.log("command not found, for more details, --help or -h");
        Deno.exit;
      },
    ],
  ]);
}
