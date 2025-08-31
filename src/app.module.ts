import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { DatabaseModule } from './api/database/database.module';
import { AuthModule } from './api/auth/auth.module';
import { MailModule } from './api/mail/mail.module';
import { OtpModule } from './api/otp/otp.module';
import { UserModule } from './api/user/user.module';
import { WaitlistModule } from './api/waitlist/waitlist.module';
import { TemplateModule } from './api/template/template.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env` as string,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        customProps: () => ({
          context: 'HTTP',
        }),
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),
    DatabaseModule,
    AuthModule,
    MailModule,
    OtpModule,
    UserModule,
    WaitlistModule,
    TemplateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
