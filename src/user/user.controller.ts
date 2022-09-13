import { JwtGuard } from './../auth/guard/jwt.guard';
import { UserService } from './user.service';
import { Controller, Get, UseGuards, Patch, Body } from '@nestjs/common';
import { getUser } from './../auth/decorator/get-user.decorator';
import { User } from '@prisma/client';
import { EditUserDto } from './dto';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  getMe(@getUser() user: User) {
    return user;
  }

  @Patch()
  editUser(@getUser('id') userId: number, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto);
  }
}
