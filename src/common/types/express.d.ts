declare global {
  namespace Express {
    export interface Request {
      currentUser?: {
        id: number;
      };
    }
  }
}

export {};
