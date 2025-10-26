// deno-lint-ignore-file no-import-prefix
import { parser, ScheduleCancelRequest } from "@nktkas/hyperliquid/api/exchange";
import { ApiRequestError } from "@nktkas/hyperliquid";
import { assertRejects } from "jsr:@std/assert@1";
import { runTest } from "./_t.ts";

runTest({
  name: "scheduleCancel",
  codeTestFn: async (_t, exchClient) => {
    await assertRejects(
      async () => {
        await exchClient.scheduleCancel({ time: Date.now() + 30000 });
      },
      ApiRequestError,
      "Cannot set scheduled cancel time until enough volume traded",
    );
  },
  cliTestFn: async (_t, runCommand) => {
    const data = await runCommand(["exchange", "scheduleCancel", "--time", "170000000000"]);
    parser(ScheduleCancelRequest)(data);
  },
});
