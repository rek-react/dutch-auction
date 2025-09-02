import { CONFIG } from "@/config/global-config";

export function ipfsToHttp(uri: string, gateway = `${CONFIG.ipfsGateway}/`) {
  return uri.replace("ipfs://", gateway);
}
