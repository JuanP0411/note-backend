import { Body, Controller, HttpException, HttpStatus, Post } from "@nestjs/common"
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService){

    }

    @Post('login')
    async login(@Body() body) {
      const { username, password } = body;
      const user = await this.authService.login(username, password);
      if (!user) {
        throw new HttpException('Invalid credentials test', HttpStatus.UNAUTHORIZED);
      }
      return user;
    }

}