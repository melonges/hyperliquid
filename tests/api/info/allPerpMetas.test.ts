import { AllPerpMetasRequest, AllPerpMetasResponse, parser } from "@nktkas/hyperliquid/api/info";
import { schemaCoverage } from "../_schemaCoverage.ts";
import { runTest } from "./_t.ts";

runTest({
  name: "allPerpMetas",
  codeTestFn: async (_t, client) => {
    const data = await Promise.all([
      client.allPerpMetas(),
    ]);
    schemaCoverage(AllPerpMetasResponse, data);
  },
  cliTestFn: async (_t, runCommand) => {
    const data = await runCommand(["info", "allPerpMetas"]);
    parser(AllPerpMetasRequest)(JSON.parse(data));
  },
});
