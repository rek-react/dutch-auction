import { formatEther } from "viem";

export function formatEth(
  value: bigint | number | string,
  decimals: number = 6
): string {
  if (typeof value === "bigint" || typeof value === "number") {
    const bigIntValue = typeof value === "bigint" ? value : BigInt(value);
    const eth = formatEther(bigIntValue);
    return Number(eth).toFixed(decimals);
  }

  if (typeof value === "string") {
    if (value.includes(".")) {
      return Number(value).toFixed(decimals); // ETH
    } else {
      const bigIntValue = BigInt(value);
      const eth = formatEther(bigIntValue);
      return Number(eth).toFixed(decimals);
    }
  }

  return Number(0).toFixed(decimals);
}
