// deno-lint-ignore-file no-import-prefix
import { CreateVaultRequest, parser } from "@nktkas/hyperliquid/api/exchange";
import { ApiRequestError } from "@nktkas/hyperliquid";
import { assertRejects } from "jsr:@std/assert@1";
import { runTest } from "./_t.ts";

runTest({
  name: "createVault",
  codeTestFn: async (_t, exchClient) => {
    await assertRejects(
      async () => {
        await exchClient.createVault({
          name: "test",
          description: "1234567890",
          initialUsd: Number.MAX_SAFE_INTEGER,
          nonce: Date.now(),
        });
      },
      ApiRequestError,
      "Insufficient balance to create vault",
    );
  },
  cliTestFn: async (_t, runCommand) => {
    const data = await runCommand([
      "exchange",
      "createVault",
      "--name",
      "test",
      "--description",
      "1234567890",
      "--initialUsd",
      "100000000",
      "--nonce",
      "1234567890",
    ]);
    parser(CreateVaultRequest)(data);
  },
});
