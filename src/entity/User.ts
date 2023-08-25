import { randomUUID } from "crypto"
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity('user')
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable : false })
    firstName: string

    @Column({ nullable : false })
    lastName: string

    @Column({ nullable : false })
    age: number


    constructor(fisrtName: string, lastName: string,age: number) {
        this.firstName = fisrtName,
        this.lastName = lastName,
        this.age = age
    }

}
