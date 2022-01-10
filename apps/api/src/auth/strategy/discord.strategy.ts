import { Profile, Strategy } from 'passport-discord';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { TokenType } from '../../utils/types';
import { UserDetails } from '../../auth/userDetails.dto';
@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL: process.env.DISCORD_CALLBACK_URL,
      scope: ['identify', 'guilds'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { username, discriminator, id: discordId, avatar } = profile;
    const userType = TokenType.User;
    const details: UserDetails = {
      id: discordId,
      username,
      discriminator,
      avatar,
      accessToken,
      refreshToken,
      type: userType,
    };

    const jwtToken = await this.authService.validateUser(details);
    return jwtToken;
  }
}
