import { ObjectId } from "mongodb"
import { Column, Entity, ObjectIdColumn } from "typeorm"

@Entity()
export class User {
    @ObjectIdColumn()
    id: ObjectId

    @Column({
        length: 30
    })
    name: string

    @Column()
    mail: string

    @Column()
    phone: string
}