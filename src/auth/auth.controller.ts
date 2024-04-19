import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @Post('/register')
    register(
        @Body() registerDto: RegisterDto,
    ) : Promise<{ token: string }> {
        return this.authService.register(registerDto);
    }

    @Post('/login')
    login(
        @Body() loginDto: LoginDto,
    ) : Promise<{ token: string }> {
        return this.authService.login(loginDto);
    }
}
