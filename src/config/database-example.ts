import { TypeOrmModule } from "@nestjs/typeorm";

export const databaseProviders = [

        TypeOrmModule.forRoot({
            type:"mysql",
            port:3306,
            username:'root',
            host:"192.168.1.1",
            password:'password',
            database:'testdb',
            entities:[
                __dirname+'/../*.entity{.ts,.js}',
                __dirname+'/../**/*.entity{.ts,.js}',
                __dirname+'/../**/**/*.entity{.ts,.js}',
            ],
            synchronize:true
        })
    ]