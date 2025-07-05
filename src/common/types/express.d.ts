declare global {
  namespace Express {
    export interface Request {
      currentUser?: {
        _id: string;
      };
    }
  }
}

export {};
