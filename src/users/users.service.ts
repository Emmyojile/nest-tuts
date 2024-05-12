import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor (@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  findAll(role?: 'INTERN' | 'ADMIN' | 'ENGINEER'): Promise<User[]> {
    if (role) {
      return this.userRepository.find({ where: { role } }); // Use repository methods
    }
    return this.userRepository.find(); // Find all users
  }

  // findOne(id: number) {
  //   const user = this.users.find((user) => user.id === id);

  //   if (!user) {
  //     throw new NotFoundException(`User with ID ${id} not found`);
  //   }
  //   return user;
  // }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new User();
    newUser.name = createUserDto.name;
    newUser.email = createUserDto.email;
    newUser.role = createUserDto.role;
  
    // Alternatively, use object spread syntax for assignment
    // const newUser = { ...createUserDto }; 
  
    const savedUser = await this.userRepository.save(newUser);
    return savedUser;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   this.users = this.users.map((user) => {
  //     if (user.id === id) {
  //       return {
  //         ...user,
  //         ...updateUserDto,
  //       };
  //     }
  //     return user;
  //   });
  //   return this.findOne(id);
  // }

  // delete(id: number) {
  //   const removedUser = this.findOne(id);

  //   this.users = this.users.filter((user) => user.id !== id);

  //   return removedUser;
  // }
}


  // private users = [
  //   { name: 'John Doe', id: 1, email: 'john.doe@example.com', role: 'ADMIN' },
  //   {
  //     name: 'Jane Smith',
  //     id: 2,
  //     email: 'jane.smith@example.com',
  //     role: 'INTERN',
  //   },
  //   {
  //     name: 'Mike Jones',
  //     id: 3,
  //     email: 'mike.jones@example.com',
  //     role: 'INTERN',
  //   },
  //   {
  //     name: 'Alice Brown',
  //     id: 4,
  //     email: 'alice.brown@example.com',
  //     role: 'ADMIN',
  //   },
  //   {
  //     name: 'David Johnson',
  //     id: 5,
  //     email: 'david.johnson@example.com',
  //     role: 'ENGINEER',
  //   },
  // ];