import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { UserDetails } from '../../auth/userDetails.dto';
import { Guild } from '../dtos/Guild.dto';
import { UserService } from '../../user/user.service';
import { PrismaService } from '../../prisma/prisma.service';
import { PaymentService } from './payment.service';
import { DiscordConfig, Payment } from '.prisma/client';

@Injectable()
export class GuildsService {
  constructor(
    private prismaService: PrismaService,
    private readonly paymentService: PaymentService,
    @Inject(HttpService) private readonly httpService: HttpService
  ) {}

  async fetchGuilds(user: UserDetails): Promise<Guild[]> {
    // const { data: userGuilds } = await this.discordHttpService.fetchUserGuilds(
    //   user.accessToken
    // );
    // const { data: botGuidls } = await this.discordHttpService.fetchBotGuilds();
    // const adminGuilds = userGuilds.filter(
    //   ({ permissions }) => (parseInt(permissions) & 0x8) === 0x8
    // );
    // const validGuilds = userGuilds.filter((guild) =>
    //   botGuidls.some((botGuild) => botGuild.id === guild.id)
    // );

    // const userDetails = await this.userService.getUserDetails(user.id);

    const fetchedGuilds = this.httpService.get(
      'https://discord.com/api/v9/users/@me/guilds',
      {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      }
    );

    const guilds = await (await lastValueFrom(fetchedGuilds)).data;

    const validGuilds: Guild[] = [];

    guilds.forEach((guild: Guild) => {
      const perms = Number(guild.permissions);
      if (perms & 0x0000000020) {
        validGuilds.push(guild);
      }
    });

    let spliceIndex = 0;

    await Promise.all(
      validGuilds.map(async (guild) => {
        const storedGuild = await this.prismaService.discordConfig.findUnique({
          where: { id: guild.id },
        });

        if (storedGuild) {
          guild.joined = true;

          //Looks like its removing the item from the array but this could be
          //Achieved in one line so im unsure why idid it this method
          //Unless its doing something else.
          validGuilds.splice(validGuilds.indexOf(guild), 1);
          validGuilds.splice(spliceIndex, 0, guild);

          let gIcon = guild.icon;
          //Fix to insert emprt
          if (!gIcon) {
            gIcon = 'na';
          }

          await this.prismaService.discordConfig.update({
            where: { id: guild.id },
            data: {
              name: guild.name,
              icon: gIcon,
            },
          });
          //Uncomment and see what this does once Branch is merged with master
          // validGuilds.filter((lGuild) => lGuild.id !== guild.id);
          spliceIndex++;
        }
      })
    );

    return validGuilds;
  }

  //Grabs Guilds from Database instead of Discord API
  async getLocalData(serverId: string): Promise<LocalData> {
    const config = await this.prismaService.discordConfig.findUnique({
      where: { id: serverId },
    });
    if (!config) return;

    const payments = await this.paymentService.getPayments(serverId);

    return {
      config,
      payments,
    };
  }
}

export interface LocalData {
  config: DiscordConfig;
  payments: Payment[];
}
