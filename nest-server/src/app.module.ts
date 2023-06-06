import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppartementModule } from './appartement/appartement.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { CatsModule } from './cats/cats.module';
import { YController } from './y/y.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    AppartementModule,
    PrismaModule,
    CatsModule,
    ],
  controllers: [YController],
})
export class AppModule { }
