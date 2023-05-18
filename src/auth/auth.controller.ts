import { Body, Controller, Post } from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { AuthService } from "./auth.service";
import { AuthEntity } from "./entity/auth.entity";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { UsersService } from "src/users/users.service";
import { UserEntity } from "src/users/entities/user.entity";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly usersService: UsersService) { }

  @Post("register")
  @ApiCreatedResponse({ type: UserEntity })
  async create(@Body() registerDto: RegisterDto) {
    return new UserEntity(await this.usersService.create(registerDto));
  }

  @Post("login")
  @ApiOkResponse({ type: AuthEntity })
  login(@Body() { email, password }: LoginDto) {
    return this.authService.login(email, password);
  }
}
