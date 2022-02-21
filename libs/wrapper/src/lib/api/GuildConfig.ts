import {
  CreateApplication,
  GuildConfig,
  GuildData,
  Payment,
  TutorApplication,
} from '@labmaker/shared';
import { CreateOrderDto } from '../types';
import { AXIOS } from './Axios';

export const getGuildConfigs = () => AXIOS.get<GuildConfig[]>(`/guilds/`);

//Merge with function below
export const getGuildData = (serverId: string) =>
  AXIOS.get<GuildData>(`/guilds/${serverId}?payments=true&guildInfo=true`);

export const getGuildConfig = (serverId: string) =>
  AXIOS.get<GuildConfig>(`/guilds/${serverId}?payments=false`);

export const createGuildConfig = (serverId: string, name: string) =>
  AXIOS.post<GuildConfig>(`/guilds/config/${serverId}?name=${name}`);

export const updateGuildConfig = (config: GuildConfig) =>
  AXIOS.put<GuildConfig>(`guilds`, config);

//Payment Stuff Below
export const getDiscordPayments = (id: string) =>
  AXIOS.get(`guilds/payments/${id}`);

export const createDiscordPayments = (payments: Payment[]) =>
  AXIOS.post(`guilds/payments`, payments);

export const updatePayments = (payments: Payment[]) => {
  console.log(payments);
  return AXIOS.put(`guilds/payments`, { payments });
};
export const deletePayments = (paymentIds: number[]) =>
  AXIOS.delete(`guilds/payments`, { data: paymentIds });

export const createPaypalOrder = (
  tutorId: string,
  channelId: string,
  price: number
) =>
  AXIOS.get<CreateOrderDto>(
    `pay/create_order/${tutorId}/${channelId}/${price}`
  );

export const getCanApply = (serverId: string) =>
  AXIOS.get<boolean>(`guilds/${serverId}/apply`);

export const createApplication = (
  serverId: string,
  application: CreateApplication
) => AXIOS.post(`guilds/${serverId}/apply`, application);

export const getApplications = (serverId: string) =>
  AXIOS.get<TutorApplication[]>(`guilds/${serverId}/applications`);

export const reviewApplication = (id: number, action: string) =>
  AXIOS.put(`guilds/${id}/review?action=${action}`);

export const fetchTicketStatus = (serverId: string) =>
  AXIOS.get<boolean>(`guilds/tickets/${serverId}/enabled`);
