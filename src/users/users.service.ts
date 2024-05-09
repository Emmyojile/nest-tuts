import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    { name: 'John Doe', id: 1, email: 'john.doe@example.com', role: 'ADMIN' },
    {
      name: 'Jane Smith',
      id: 2,
      email: 'jane.smith@example.com',
      role: 'INTERN',
    },
    {
      name: 'Mike Jones',
      id: 3,
      email: 'mike.jones@example.com',
      role: 'INTERN',
    },
    {
      name: 'Alice Brown',
      id: 4,
      email: 'alice.brown@example.com',
      role: 'ADMIN',
    },
    {
      name: 'David Johnson',
      id: 5,
      email: 'david.johnson@example.com',
      role: 'ENGINEER',
    },
  ];
  findAll(role?: 'INTERN' | 'ADMIN' | 'ENGINEER') {
    if (role) {
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    return user;
  }

  create(user: {
    name: string;
    email: string;
    role: 'INTERN' | 'ADMIN' | 'ENGINEER';
  }) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(
    id: number,
    updatedUser: {
      name?: string;
      email?: string;
      role?: 'INTERN' | 'ADMIN' | 'ENGINEER';
    },
  ) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          ...updatedUser,
        };
      }
      return user;
    });
    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);

    this.users = this.users.filter((user) => user.id !== id);

    return removedUser;
  }
}
