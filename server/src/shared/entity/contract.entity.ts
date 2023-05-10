import { Column, Entity, ObjectIdColumn, ObjectId } from "typeorm"
import { User } from "./user.entity"

@Entity()
export class Contract {
    @ObjectIdColumn()
    id: ObjectId

    @Column()
    num: number

    @Column()
    begin: Date

    @Column()
    end: Date

    @Column((type) => User)
    supervisor: User
}