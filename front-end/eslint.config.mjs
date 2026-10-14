import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
export default defineConfig([
  ...nextVitals,
  globalIgnores([".next/**"]),
  { files: ["src/ui/**"], rules: { "react-hooks/purity": "off" } },
]);
