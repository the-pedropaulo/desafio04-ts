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
    email: string

    @Column({ nullable : false })
    password: string

    @Column({ nullable : false })
    age: number


    constructor(
        firstName: string, 
        lastName: string, 
        email: string, 
        password: string,
        age: number
        ) {
        this.firstName = firstName,
        this.lastName = lastName,
        this.email = email,
        this.password = password
        this.age = age
    }

}
