import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from '../../core/jwtStrategy';
import { defaultConf } from '../../config/default';
import { UsersController } from './users.controller';
import { UserEntity } from './users.entity';
import { UsersService } from './users.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: defaultConf.jwt.secret,
      signOptions: {
        expiresIn: defaultConf.jwt.expire
      }
    }),
    TypeOrmModule.forFeature([UserEntity])
  ],
  controllers: [UsersController],
  providers: [UsersService,JwtStrategy],
  exports:[PassportModule,JwtStrategy]
})
export class UsersModule { }
