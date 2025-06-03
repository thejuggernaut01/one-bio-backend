import * as dotenv from 'dotenv';
dotenv.config();

interface IEnvironment {
  APP: {
    NAME: string;
    PORT: number;
    ENV: string;
  };
  DB: {
    URI: string;
  };
  JWT: {
    ACCESS_TOKEN: string;
    REFRESH_TOKEN: string;
    ACCESS_TOKEN_EXPIRES_IN: string;
    REFRESH_TOKEN_EXPIRES_IN: string;
  };
  SMTP: {
    PROJECT_ID: string;
    SENDER_ADDRESS: string;
    PROJECT_SECRETS: string;
  };
}

export const ENVIRONMENT: IEnvironment = {
  APP: {
    NAME: process.env.APP_NAME,
    PORT: Number(process.env.PORT || 4001),
    ENV: process.env.NODE_ENV,
  },
  DB: {
    URI: process.env.URI,
  },
  JWT: {
    ACCESS_TOKEN: process.env.JWT_ACCESS_TOKEN,
    REFRESH_TOKEN: process.env.JWT_REFRESH_TOKEN,
    ACCESS_TOKEN_EXPIRES_IN: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
    REFRESH_TOKEN_EXPIRES_IN: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
  },
  SMTP: {
    PROJECT_ID: process.env.SMTP_PROJECT_ID,
    SENDER_ADDRESS: process.env.SMTP_SENDER_ADDRESS,
    PROJECT_SECRETS: process.env.SMTP_PROJECT_SECRETS,
  },
};

export const isProduction = ENVIRONMENT.APP.ENV === 'production';
