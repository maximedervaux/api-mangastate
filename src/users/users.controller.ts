import { Body,Post, Controller, UseGuards, Req, Param, Get } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    
    @Post('addMangaToUser/:id_manga')
    @UseGuards(AuthGuard)
    async addMangaToUser(@Req() req, @Param('id_manga') id_manga: number) {
        const user = req.user;
        return this.usersService.addMangaToUser(user,id_manga);
    }

    @Get('getMangasByUserId/:id_user')
    @UseGuards(AuthGuard)
    async getMangasByUserId(@Param('id_user') id_user: number) {
        return this.usersService.findMangasByUserId(id_user);
    }

}
