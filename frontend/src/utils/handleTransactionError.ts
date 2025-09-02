import { BaseError, UserRejectedRequestError } from "viem";
import { notify } from "./notify";

export function handleTransactionError(err: unknown) {
  if (err instanceof UserRejectedRequestError) {
    notify("Transaction was rejected by the user", "error");
  } else if (err instanceof BaseError) {
    notify(`Transaction failed: ${err.shortMessage || err.message}`, "error");
  } else {
    notify("Unknown error occurred while sending transaction", "error");
    console.error(err);
  }
}
