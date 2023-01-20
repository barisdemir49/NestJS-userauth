import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './users.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './users.entity';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { defaultConf } from 'src/config/default';
import { JwtPayload } from '../../core/jwt.payload.interfaces';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UserEntity)
        private UserRepository: Repository<UserEntity>,
        private jwtService: JwtService,
    ) { }

    async makeToken(user: UserEntity) {
        const payload = {
            uuid: user.uuid,
            username: user.username,
            level: user.level
        }
        const accessToken = await this.jwtService.sign(payload)
        return {
            accessToken,
            ...payload
        }
    }

    async tokenUUIDcontrol(uuid: string) {
        try {
            const user = await this.UserRepository.findOne({ where: { uuid } })
            if (!user)
                throw 'invalid user!'
            return this.makeToken(user)
        } catch (error) {
            throw new UnauthorizedException(error.message || error)
        }
    }

    async refreshToken(token: string) {
        try {
            return jwt.verify(token, defaultConf.jwt.secret, async (err, decode) => {
                if (err)
                    throw new UnauthorizedException('invalid token!')
                const user = new UserEntity
                user.uuid = decode['uuid']
                user.username = decode['username']
                user.level = decode['level']
                return await this.makeToken(user)

            })

        } catch (error) {
            throw new UnauthorizedException(error.message || error)
        }
    }

    async login(data: LoginDto) {
        try {

            const user = await this.UserRepository.findOne({
                where: {
                    username: data.username,
                    password: data.password
                }
            })
            if (!user)
                throw 'invalid username or password!'
            else {
                return this.makeToken(user)
            }
        } catch (error) {
            throw new UnauthorizedException(error.message || error)
        }
    }


    async myProfile(user: JwtPayload) {
        try {
            return await this.UserRepository.findOne({ where: { uuid: user.uuid } })
        } catch (error) {
            throw new ForbiddenException(error.message || error)
        }
    }


}
