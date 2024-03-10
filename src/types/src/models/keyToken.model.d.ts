declare module "mModel" {
  export interface IKeyTokenModel {
    user: string;
    publicKey: string;
    refreshToken: string;
    refreshTokenUsed: string[];
  }
}
