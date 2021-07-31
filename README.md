# chronos

A tool to manage my time spent in each task. Made with Deno.

This is a study case for building CLI with Deno. With this in mind, I wasn't
worried in using dependencies.

# How does it Work?

It will create a folder called .Chronos. Inside it will create a json file with
the actual date as a name.

Inside this file, it will contain a single object with each task name as a
object containing start and finish properties.

# Running:

To Run this tool, you need to allow read and write and flag it as unstable.

`deno run --unstable --allow-read --allow-write src/mod.ts`

# Commands:

To start a task, you can use -s/--start.

```
deno run --unstable --allow-read --allow-write src/mod.ts -s task name
deno run --unstable --allow-read --allow-write src/mod.ts --start task_name
```

To finish a task, you can use -f/--finish.

```
deno run --unstable --allow-read --allow-write src/mod.ts -f task name
deno run --unstable --allow-read --allow-write src/mod.ts --finish task_name
```

## If you leave the task name empty, it will use default_task as default.
