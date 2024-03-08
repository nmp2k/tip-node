declare module "mModel" {
  // ApiKey model document
  export interface ApiKeyDocument {
    key: string;
    status: boolean;
    permissions: Array<"0000" | "1111" | "2222">;
  }
}
