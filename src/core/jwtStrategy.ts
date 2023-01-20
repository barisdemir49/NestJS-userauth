import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy } from 'passport-jwt';
import { UserEntity } from "../modules/users/users.entity";
import { Repository } from "typeorm";
import { defaultConf } from "../config/default";
import { UsersService } from "../modules/users/users.service";
import { JwtPayload } from "./jwt.payload.interfaces";

const extractToken = (req) => {
    if(req.headers.authorization && req.headers.authorization.split(' ')[0]==='Bearer'){
        return req.headers.authorization.split(' ')[1]
    } else if (req.query && req.query.token){
       return req.query.token
    }
    return null
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        private userService: UsersService
    ) {
        super({
            jwtFromRequest: extractToken,
            secretOrKey: defaultConf.jwt.secret
        })
    }

    async validate(payload: JwtPayload) {
        return await this.userService.tokenUUIDcontrol(payload.uuid)
    }
}