import { Injectable } from "@nestjs/common";
import { UsersService } from "src/user/user.service";
@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async login(username: string, password: string): Promise<any> {
        const user = await this.usersService.validateUser(username, password);
        if (user) {
          const { password, ...result } = user;
          return result;
        }
        return null;
      }

    signup(){
        return {msg: 'I havge signed up '}
    }
}