import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  DropDown,
  InfoTitle,
  InputBox,
  Item,
  SettingsContainer,
  SwitchToggle,
} from '@labmaker/ui';
import { useGuildLogic } from '../../utils/hooks/useGuildLogic';
import {
  ChannelType,
  PartialGuildChannel,
  PartialRole,
} from '@labmaker/shared';
import { getChannels, getRoles } from '@labmaker/wrapper';
import { parseChannels, parseRoles } from '../../utils/helpers';

/* eslint-disable-next-line */
export interface TicketSettingsProps {
  categories: Item[];
  textChannels: Item[];
  parsedRoles: Item[];
}

export function TicketSettings({
  categories,
  textChannels,
  parsedRoles,
}: TicketSettingsProps) {
  const { config, setConfig } = useGuildLogic();

  return (
    <SettingsContainer id="GeneralSettings">
      <InfoTitle title={'Ticket'} header={true} />

      {config.id !== '-1' && (
        <div>
          <DropDown
            title="Orders Category"
            items={categories}
            onChange={(e) => {
              setConfig({
                ...config,
                ordersCategory: String(e),
              });
            }}
            value={config.ordersCategory}
          />
          <DropDown
            title="Notification Channel"
            items={textChannels}
            onChange={(e) => {
              setConfig({
                ...config,
                notificationChannel: String(e),
              });
            }}
            value={config.notificationChannel}
          />
          <DropDown
            title="Staff Role"
            items={parsedRoles}
            onChange={(e) => {
              setConfig({
                ...config,
                staffRole: String(e),
              });
            }}
            value={config.staffRole}
          />
          <DropDown
            title="Tutor Role"
            items={parsedRoles}
            onChange={(e) => {
              setConfig({
                ...config,
                tutorRole: String(e),
              });
            }}
            value={config.tutorRole}
          />
          <InputBox
            message="Ticket Channel Name"
            value={config.channelName}
            onChange={(e) => {
              setConfig({
                ...config,
                channelName: e.target.value,
              });
            }}
          />
          <SwitchToggle
            message="Hide Channel on Delete"
            toggled={config.hideChannel}
            onToggle={() => {
              setConfig({
                ...config,
                hideChannel: !config.hideChannel,
              });
            }}
          />
          <SwitchToggle
            message="Notify on Delete"
            toggled={config.notifyUser}
            onToggle={() => {
              setConfig({
                ...config,
                notifyUser: !config.notifyUser,
              });
            }}
          />
        </div>
      )}
    </SettingsContainer>
  );
}

const StyledSpan = styled.span`
  padding-right: 5px;
  margin-left: 2px;
  margin-bottom: 5px;
`;
