import { InfoTitle } from './info-box';
import styled from 'styled-components';
import { useState } from 'react';

export interface IOnDateTimeChange {
  (event: React.ChangeEvent<HTMLInputElement>): void;
}
/* eslint-disable-next-line */
export interface InputRangeProps {
  value: number;
  infoMessage?: string | React.ReactNode;
  message: string;
  onChange: IOnDateTimeChange;
}

export function InputRange({
  message,
  infoMessage,
  value,
  onChange,
}: InputRangeProps) {
  return (
    <>
      <InfoTitle title={message} infoMessage={infoMessage} />
      <StyledInputBox>
        <StyledInputRange
          type="datetime-local"
          value={value}
          onChange={(e) => onChange(e)}
        />
      </StyledInputBox>
    </>
  );
}

const StyledInputBox = styled.div`
  user-select: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  input {
    /* width: 93%; */
  }
  h1 {
    padding-left: 10px;
    /* width: 7%; */
  }
`;

// excess height to improve interactive area / accessibility
const height = '36px';
const thumbHeight = 36;
const trackHeight = '16px';

// colours

const makeLongShadow = (color: any, size: any) => {
  let i = 18;
  let shadow = `${i}px 0 0 ${size} ${color}`;

  for (; i < 706; i++) {
    shadow = `${shadow}, ${i}px 0 0 ${size} ${color}`;
  }

  return shadow;
};

const StyledInputRange = styled.input`
  /* width: 100%; */
  overflow: hidden;
  display: block;
  appearance: none;
  /* max-width: 700px; */
  width: 100%;
  margin: 0;
  height: ${height};
  background: #202225;

  cursor: pointer;

  &:focus {
    outline: none;
  }

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: ${height};
    background: ${(p) => p.theme.input.range.lowerBackground};
  }

  &::-webkit-slider-thumb {
    position: relative;
    appearance: none;
    height: ${thumbHeight}px;
    width: ${thumbHeight}px;
    background: ${(p) => p.theme.input.range.thumbCol};
    border-radius: 100%;
    border: 0;
    top: 50%;
    transform: translateY(-50%);
    box-shadow: ${(p) => makeLongShadow(p.theme.input.range.upperCol, '-10px')};
    transition: background-color 150ms;
  }

  &::-moz-range-track,
  &::-moz-range-progress {
    width: 100%;
    height: ${height};
    background: ${(p) => p.theme.input.range.upperBackground};
  }

  &::-moz-range-progress {
    background: ${(p) => p.theme.input.range.lowerBackground};
  }

  &::-moz-range-thumb {
    appearance: none;
    margin: 0;
    height: ${thumbHeight};
    width: ${thumbHeight};
    background: ${(p) => p.theme.input.range.thumbCol};
    border-radius: 100%;
    border: 0;
    transition: background-color 150ms;
  }

  &::-ms-track {
    width: 100%;
    height: ${height};
    border: 0;
    /* color needed to hide track marks */
    color: transparent;
    background: transparent;
  }

  &::-ms-fill-lower {
    background: ${(p) => p.theme.input.range.lowerBackground};
  }

  &::-ms-fill-upper {
    background: ${(p) => p.theme.input.range.upperBackground};
  }

  &::-ms-thumb {
    appearance: none;
    height: ${thumbHeight};
    width: ${thumbHeight};
    background: ${(p) => p.theme.input.range.thumbCol};
    border-radius: 100%;
    border: 0;
    transition: background-color 150ms;
    /* IE Edge thinks it can support -webkit prefixes */
    top: 0;
    margin: 0;
    box-shadow: none;
  }

  &:hover,
  &:focus {
    &::-webkit-slider-thumb {
      background-color: ${(p) => p.theme.input.range.thumbHover};
    }
    &::-moz-range-thumb {
      background-color: ${(p) => p.theme.input.range.thumbHover};
    }
    &::-ms-thumb {
      background-color: ${(p) => p.theme.input.range.thumbHover};
    }
  }
`;
