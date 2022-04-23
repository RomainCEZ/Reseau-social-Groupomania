import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Email } from './entities/Email.entity';
import { User } from './entities/User';
import { UserPassword } from './entities/UserPassword.entity';
import { IUsersRepository } from './interfaces/UsersRepository.interface';
import { UsersRepository } from './repositories/UsersRepository';

@Injectable()
export class UsersService {
    constructor(
        @Inject(UsersRepository) private usersRepository: IUsersRepository,
    ) { }

    async createUser(createUserDto: CreateUserDto) {
        const user = User.create({
            email: Email.create(createUserDto.email).email,
            username: createUserDto.username,
            password: UserPassword.createHash(createUserDto.password)
        })
        return await this.usersRepository.saveUser(user)
    }

    async saveUser(user: User) {
        return await this.usersRepository.saveUser(user)
    }

    async findByEmail(email: string) {
        return await this.usersRepository.getByEmail(email.toLowerCase())
    }

    async findById(id: string) {
        return await this.usersRepository.getById(id)
    }

    async changePassword(userId: string, password: string) {
        await this.usersRepository.changePassword(userId, password)
    }

    async disableAccount(id: string) {
        await this.usersRepository.disableAccount(id)
    }
}
