import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { ERROR_CONSTANT } from '../constants/error.constant';
import { BaseHelper } from '../utils/helper.util';
import { IDecodedToken } from '../types';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException(ERROR_CONSTANT.AUTH.UNAUTHORIZED);
    }
    try {
      const decodeAccessToken = BaseHelper.verifyJwtAccessToken(
        token,
      ) as IDecodedToken;

      request['currentUser'] = { id: decodeAccessToken.id };
    } catch {
      throw new UnauthorizedException(ERROR_CONSTANT.AUTH.UNAUTHORIZED);
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
