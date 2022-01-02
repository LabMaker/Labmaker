import { InputBox } from '@labmaker/ui-inputs';
import { ContainerStyle } from '../../assets/styles';
import styled from 'styled-components';
import React from 'react';
// interface AccountSettingsProps {}

export function AccountSettings() {
  return (
    <GeneralSettingContainer>
      <h1>Account</h1>
      <InputBox
        message="Client ID"
        value={'My Id'}
        infoMessage={
          'Enter Your Client ID for your script from https://reddit.com/prefs/apps'
        }
        onChange={(e: React.FormEvent<EventTarget>) => console.log(e)}
      />
      <InputBox
        message="Client Secret"
        value={'My Secret'}
        infoMessage={
          'Enter Your Client Secret for your script from https://reddit.com/prefs/apps'
        }
        onChange={(e: React.FormEvent<EventTarget>) => console.log(e)}
      />
      <InputBox
        message="Username"
        value={'Username'}
        onChange={(e: React.FormEvent<EventTarget>) => console.log(e)}
      />
      <InputBox
        message="Password"
        value={'asdasda3q'}
        onChange={(e: React.FormEvent<EventTarget>) => console.log(e)}
      />
      <InputBox
        message="User Agent"
        value={'<platform: firefox>'}
        onChange={(e: React.FormEvent<EventTarget>) => console.log(e)}
      />
    </GeneralSettingContainer>
  );
}

const GeneralSettingContainer = styled(ContainerStyle)`
  display: flex;
  flex-direction: column;
  padding: 25px;
  padding-top: 5px;
  h1 {
    text-align: center;
    border-radius: 5px;
    width: 100%;
    font-size: 24px;
  }

  .inputBox {
    width: 100%;
    padding-bottom: 10px;
  }
  @media (max-width: 812px) {
    display: block;
  }
`;
