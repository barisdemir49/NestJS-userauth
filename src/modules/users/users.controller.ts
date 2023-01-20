import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtPayload } from '../../core/jwt.payload.interfaces';
import { GetUser, Level } from '../../core/decorators';
import { RolesGuard } from '../../core/guards';
import { LoginDto } from './users.dto';
import { UserLevel } from './users.enums';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(
        private usersService: UsersService
    ) { }

    @Post('resfreshtoken')
    async refreshToken(
        @Body() data: any
    ) {
        return this.usersService.refreshToken(data.token)
    }
    /**user login */
    @Post()
    async login(
        @Body() data: LoginDto
    ) {
        return await this.usersService.login(data)
    }

    /** test user guard */
    @UseGuards(AuthGuard(), RolesGuard)
    @Level(UserLevel.USER)
    @Get('user')
    async testUser(
        @GetUser() user: JwtPayload,
    ) {
        return await this.usersService.myProfile(user);
    }

    /**test admin guard */
    @UseGuards(AuthGuard(), RolesGuard)
    @Level(UserLevel.ADMIN)
    @Get('admin')
    async testAdmin(
        @GetUser() user: JwtPayload,
    ) {
        return await this.usersService.myProfile(user);
    }
}
