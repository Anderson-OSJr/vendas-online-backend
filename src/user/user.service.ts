import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService { 
    
    constructor (
            @InjectRepository(UserEntity)
            private readonly userRepository: Repository <UserEntity>) {}

    /* CREATE USER FUNCTION */
    async createUser (createUserDto: CreateUserDto): Promise<UserEntity> {
        const saltOrRounds = 10;
        const passwordHashed = await hash(createUserDto.password, saltOrRounds);
        return this.userRepository.save({
            ...createUserDto,
            typeUser: 1,
            password: passwordHashed
        });        
    }

    /* GET ONE USER BY HIS RELATION WITH ADDRESS */
    async getUserByIdUsingRelations(userId: number): Promise<UserEntity> {
        return this.userRepository.findOne({
            where:{
                id: userId,
            },
            relations: ['addresses'],
        });
    }

    /* GET ALL USERS FUNCTION */
    async getAllUsers(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }

    /* GET(FIND) USER BY ID */
    async findUserById(userId: number): Promise<UserEntity>  {
        const user = await this.userRepository.findOne({
            where: {
                id: userId
            }
        });

        if(!user) {
            throw new NotFoundException(`User ID: ${userId} not found...`);
        }

        return user;
    }
}
