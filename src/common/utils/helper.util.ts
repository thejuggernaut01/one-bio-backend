import * as bycrpt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { ENVIRONMENT } from '../config/environment';
import { randomBytes } from 'crypto';
import { CookieOptions, Response } from 'express';
import { IDecodedToken } from '../types';

export class BaseHelper {
  static hashData(data: string): Promise<string> {
    return bycrpt.hash(data, 12);
  }

  static compareHashedData(data: string, hashed: string): Promise<boolean> {
    return bycrpt.compare(data, hashed);
  }

  static generateRandomString(length = 8) {
    return randomBytes(length).toString('hex');
  }

  static generateOTP(): number {
    return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
  }

  static generateJwtAccessToken(id: string) {
    return jwt.sign({ id }, ENVIRONMENT.JWT.ACCESS_TOKEN, {
      expiresIn: ENVIRONMENT.JWT.ACCESS_TOKEN_EXPIRES_IN,
    });
  }

  static verifyJwtAccessToken(token: string) {
    return jwt.verify(token, ENVIRONMENT.JWT.ACCESS_TOKEN) as IDecodedToken;
  }

  static setCookie(
    res: Response,
    name: string,
    value: string | number,
    options: CookieOptions = {},
  ) {
    res.cookie(name, value, {
      httpOnly: true,
      secure: ENVIRONMENT.APP.ENV === 'production',
      path: '/',
      sameSite: 'none',
      ...options,
    });
  }
}
