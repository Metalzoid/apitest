import {
  Controller,
  Logger,
  UseGuards,
  Post,
  Request,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  logger: Logger;
  constructor(private readonly authService: AuthService) {
    this.logger = new Logger(AuthController.name);
  }

  @Post('signin')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req): Promise<any> {
    try {
      return await this.authService.generateJwtToken(req.user);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('viewProfile')
  async getUser(@Request() req): Promise<any> {
    return this.authService.userProfile(req.user._id);
  }
}
