declare module "mModel" {
  export interface IKeyTokenModel {
    user: string;
    publicKey: string;
    privateKey: string;
    refreshToken: string;
    refreshTokenUsed: string[];
  }
}
