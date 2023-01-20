import { BaseEntity, Column, Entity, PrimaryColumn, } from "typeorm";
import { UserLevel } from "./users.enums";
@Entity('users')
export class UserEntity extends BaseEntity {
    @PrimaryColumn()
    uuid: string

    @Column({ type: 'varchar', length: 50 })
    username: string

    @Column({ type: 'varchar', comment: 'user password', length: 50 })
    password: string

    @Column({ type: 'varchar', length: 20, comment: 'User level', default: UserLevel.USER })
    level: UserLevel

}