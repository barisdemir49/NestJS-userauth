import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";

@Injectable()
export class JwdGuard implements CanActivate {

    constructor(
    ) { }

    async canActivate(context: ExecutionContext) {

        const request = context.switchToHttp().getRequest()
        console.log(request.headers.token)
        return request.headers.publickey
    }
}