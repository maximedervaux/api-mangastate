import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { SignUpDto } from './dto/signup.dto';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id_user, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }


  async getUserProfil(username) {
     return this.usersService.findOne(username)
  }

  async signUp(payload) {
    let user = await this.usersService.findOne(payload.username);
    if (user) {
      throw new UnauthorizedException('User already exists');
    }else{ 
      user = new User();
    }
    user.username = payload.username;
    user.birthday = payload.birthday;
    user.password = payload.password; 
    let result = await this.usersService.create(payload)

    return this.signIn(result.username, result.password)
  }
}