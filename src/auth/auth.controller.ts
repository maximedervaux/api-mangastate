import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SignInDto } from './dto/signin.dto'; // Assurez-vous que le chemin est correct
import { AuthGuard } from './auth.guard';
import { Request } from '@nestjs/common'; // Utilisez cette importation pour NestJS
import { User } from 'src/users/entities/user.entity';
<<<<<<< HEAD
import { SignUpDto } from './dto/signup.dto';
=======
>>>>>>> 4d525bcf458c4b7d8c2e1ae8896ba62087aeb784

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login to the application' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully logged in',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid credentials',
  })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  @ApiOperation({ summary: 'Get the profile of the logged-in user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Profile retrieved successfully',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User not authenticated',
  })
  getProfile(@Request() req) {
    return this.authService.getUserProfil(req.user.username);
  }

<<<<<<< HEAD
  @HttpCode(HttpStatus.OK)
  @Post("signup")
  @ApiOperation({ summary: "User Signup" })
  signUp(@Body() signUpDto: SignUpDto) {
 

    return this.authService.signUp(signUpDto);
  }
=======
  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User registered successfully',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User not authenticated',
  })
  registerUser(@Body() user:User) {
    return this.authService.registerUser(user);
  }

>>>>>>> 4d525bcf458c4b7d8c2e1ae8896ba62087aeb784
}
