import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly users: UserService) {}

  @Post('login')
  login(@Body('email') email: string) {
    return this.users.findOrCreateByEmail(email);
  }
}
