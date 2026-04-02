import { rmSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const targets = [
  { path: join(root, ".next"), label: ".next" },
  { path: join(root, "node_modules", ".cache"), label: "node_modules/.cache" },
];

let any = false;
for (const { path, label } of targets) {
  if (existsSync(path)) {
    rmSync(path, { recursive: true, force: true });
    console.log(`Removed ${label}`);
    any = true;
  }
}

if (!any) {
  console.log("Already clean (.next and node_modules/.cache missing)");
}
