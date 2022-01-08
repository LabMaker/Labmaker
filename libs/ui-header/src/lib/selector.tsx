import styled from 'styled-components';

/* eslint-disable-next-line */
export interface SelectorProps {
  title?: string;
  clickEvent: () => void;
  imageUrl?: string;
}

const DisableDrag = styled.div`
  -webkit-user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
`;

const StyledSelector = styled(DisableDrag)`
  width: 100px;
  height: 150px;
  width: 6%;
  height: 9%;
  border: 2px solid black;
  img {
    -webkit-user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    /* background: rgba(0, 0, 0, 0.3); */
    width: 100%;
    height: 100%;
  }

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 44px;
    vertical-align: middle;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: anywhere;
  }

  div {
    border-top: 2px solid black;
    text-align: center;
    vertical-align: middle;
    font-size: 12px;
    /* background-color: black; */
  }

  :hover {
    background-color: #141617;
    div {
      background-color: #1f1f1f;
    }
  }

  cursor: pointer;
`;

export function Selector({ title, clickEvent, imageUrl }: SelectorProps) {
  if (!imageUrl) {
    imageUrl = `https://avatars.dicebear.com/api/micah/${title}.svg`;
  }

  return (
    <StyledSelector className="selector" onClick={clickEvent}>
      <img src={imageUrl} alt="Node Avatar" />
      <div>
        <span>{title}</span>
      </div>
    </StyledSelector>
  );
}

export default Selector;
