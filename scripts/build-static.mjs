import { spawnSync } from "node:child_process";
import { writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const nextBin = process.platform === "win32" ? "npx.cmd" : "npx";
const result = spawnSync(nextBin, ["next", "build"], {
  stdio: "inherit",
  env: {
    ...process.env,
    STATIC_EXPORT: "true",
  },
});

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

// Create .nojekyll inside out/ so GitHub Pages serves _next/ static assets properly
const outDir = join(process.cwd(), "out");
if (existsSync(outDir)) {
  writeFileSync(join(outDir, ".nojekyll"), "");
}
