import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 30
    })
    name: string

    @Column()
    mail: string

    @Column()
    phone: string
}