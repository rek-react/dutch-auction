import axios, { AxiosError, AxiosInstance } from "axios";

class PinataClient {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.PINATA_URL,
      headers: {
        pinata_api_key: process.env.PINATA_API_KEY!,
        pinata_secret_api_key: process.env.PINATA_API_SECRET!,
      },
    });
  }

  async uploadFile(file: File | Blob): Promise<string | null> {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await this.axiosInstance.post(
        "/pinning/pinFileToIPFS",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      return `ipfs://${res.data.IpfsHash}`;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.message);
      } else {
        console.error("Unknown error:", error);
      }
      return null;
    }
  }

  async uploadJSON(json: object): Promise<string | null> {
    const blob = new Blob([JSON.stringify(json)], { type: "application/json" });
    return this.uploadFile(blob);
  }

  async uploadNFT({
    file,
    name,
    description,
  }: {
    file: Blob;
    name: string;
    description: string;
  }) {
    const fileCid = await this.uploadFile(file);

    const metadata = {
      name,
      description,
      image: fileCid,
    };

    const metadataCid = await this.uploadJSON(metadata);

    return metadataCid;
  }
}

export const pinataClient = new PinataClient();
