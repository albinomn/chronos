import { existsSync, format } from "./deps.ts";

type Default = "default";
type Pattern<T> = [T | Default, () => void];

export function match<T>(obj: T, patterns: Pattern<T>[]) {
  while (patterns.length !== 0) {
    const testPattern = patterns[0];

    if (!(obj instanceof Object)) {
      if (obj === testPattern[0]) {
        testPattern[1]();
        break;
      }
    } else {
      if (JSON.stringify(testPattern[0]) === JSON.stringify(obj)) {
        testPattern[1]();
        break;
      }
    }

    if (testPattern[0] === "default") {
      testPattern[1]();
      break;
    }
    patterns.splice(0, 1);
  }
}

export function StartUp() {
  if (!existsSync("./.Chronos")) {
    Deno.mkdirSync("./.Chronos");
  }
  const path = `./.Chronos/${format(new Date(), "dd-MM-yy")}.json`;
  if (!existsSync(path)) {
    Deno.writeTextFileSync(path, JSON.stringify({}));
  }

  return path;
}
