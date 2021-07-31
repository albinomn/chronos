import { format } from "./deps.ts";

type Data = {
  [task: string]: Task;
};

type Task = {
  start: string;
  finish?: string;
};

export class Db {
  private data: Data;

  constructor(private path: string) {
    this.data = this.getData();
  }

  private getData(): Data {
    const decoder = new TextDecoder("utf-8");
    const data = Deno.readFileSync(this.path);
    return JSON.parse(decoder.decode(data)) as Data;
  }

  private saveToDb(): void {
    Deno.writeTextFile(this.path, JSON.stringify(this.data, null, 4));
  }

  getByTask(task: string): Task {
    return this.data[task];
  }

  setTask(task: string): void {
    if (task in this.data) {
      console.log(`You already have started ${task}.`);
      Deno.exit();
    }
    this.data[task] = {
      start: format(new Date(), "HH:mm:ss"),
    };

    console.log(`${task}, started at: ${this.data[task].start}.`);

    this.saveToDb();
  }

  stopTask(task: string): void {
    if (task in this.data) {
      if (this.data[task].finish) {
        console.log(`You already have finished ${task}.`);
        Deno.exit();
      }
      this.data[task] = {
        ...this.data[task],
        finish: format(new Date(), "HH:mm:ss"),
      };
      this.saveToDb();
      console.log(`${task}, stopped at: ${this.data[task].finish}.`);
    } else {
      console.log(`${task} has not started yet.`);
    }
  }
}
