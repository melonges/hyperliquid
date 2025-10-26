import { CancelByCloidRequest, CancelSuccessResponse, parser } from "@nktkas/hyperliquid/api/exchange";
import { schemaCoverage } from "../_schemaCoverage.ts";
import { openOrder, randomCloid, runTest } from "./_t.ts";

runTest({
  name: "cancelByCloid",
  codeTestFn: async (_t, exchClient) => {
    // —————————— Prepare ——————————

    const order = await openOrder(exchClient, "limit");

    // —————————— Test ——————————

    const data = await Promise.all([
      exchClient.cancelByCloid({ cancels: [{ asset: order.a, cloid: order.cloid }] }),
    ]);
    schemaCoverage(CancelSuccessResponse, data);
  },
  cliTestFn: async (_t, runCommand) => {
    const data = await runCommand([
      "exchange",
      "cancelByCloid",
      "--cancels",
      JSON.stringify([{ asset: 0, cloid: randomCloid() }]),
    ]);
    parser(CancelByCloidRequest)(data);
  },
});
