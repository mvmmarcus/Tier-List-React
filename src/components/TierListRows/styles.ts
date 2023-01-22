import styled, { css } from 'styled-components';

export const Wrapper = styled.main``;

interface TierListRowProps {
  hideRow?: boolean;
  isInitialRow?: boolean;
}

export const TierListRow = styled.div<TierListRowProps>`
  ${({ isInitialRow = false, hideRow }) => css`
    position: relative;
    display: ${hideRow ? 'none' : 'flex'};
    width: 100%;
    min-height: 90px;
    background-color: #1a1a17;
    border-top: 1px solid #000;
    border-bottom: 1px solid #000;

    ${isInitialRow && modifiers.isInitialRow()}
  `}
`;

interface TierListTitleBoxProps {
  color?: string;
}

export const TierListTitleBox = styled.div<TierListTitleBoxProps>`
  ${({ color }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90px;
    min-height: 90px;
    background-color: ${color};
    flex: none;
  `}
`;

export const TierListTitle = styled.span`
  color: #333;
  overflow: hidden;
  text-align: center;
  margin: 0.5rem;
`;

export const TierListContent = styled.div`
  width: 100%;
  min-height: 90px;
`;

export const TierListSettingsBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  width: 5rem;
  min-height: 5.5rem;
  background-color: #000;
  flex: none;

  svg {
    cursor: pointer;

    &:hover {
      opacity: 0.6;
    }
  }
`;

export const TierListSettingsArrowsBox = styled.div`
  display: flex;
  flex-direction: column;
`;

interface TierListItemProps {
  imgUrl: string;
  isDraggIng?: boolean;
  isDraggOver?: boolean;
}

export const TierListItem = styled.div<TierListItemProps>`
  ${({ imgUrl, isDraggIng }) => css`
    display: inline-block;
    width: 4rem;
    height: 4rem;
    margin: 0.1rem;
    background-image: ${`url(${imgUrl})`};
    background-size: cover;
    background-position: center;
    cursor: pointer;
    opacity: ${isDraggIng ? 0.2 : 1};
  `}
`;

const modifiers = {
  isInitialRow: () => css`
    background: none;
    border: none;
    margin-top: 20px;
  `,
};

export const ModalWrapper = styled.div`
  position: absolute;
  z-index: 1;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalHeader = styled.header`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  p {
    margin: 0 20px;
  }
`;

export const ModalContent = styled.div`
  width: 100%;
  max-width: 600px;
  position: absolute;
  padding: 20px;
  z-index: 2;
  top: 0;
  right: 50%;
  transform: translateX(50%);
  background-color: #fff;
  color: #000;
  text-align: center;

  svg {
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
    color: #3b3b3b;

    &:hover {
      color: #000;
    }
  }
`;

export const ModalText = styled.p`
  font-weight: bold;
  font-size: 20px;
  color: #000;
`;

export const ColorsBox = styled.div`
  margin: 20px 0;
`;

interface ColorOptionProps {
  background: string;
  isSelected?: boolean;
}

export const ColorOption = styled.div<ColorOptionProps>`
  ${({ background, isSelected }) => css`
    width: 30px;
    height: 30px;
    margin: 3px;
    display: inline-block;
    cursor: pointer;
    border-radius: 50%;
    background-color: ${background};
    border: ${`solid 2px ${isSelected ? '#000' : 'transparent'}`};
  `}
`;

export const TextArea = styled.textarea`
  display: flex;
  width: 100%;
  height: 50px;
  padding: 10px;
  border: 1px solid #bcbcbc;
  color: #000;
  margin: 15px 0;
`;

export const ButtonsBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

export const Button = styled.button`
  width: 100%;
  max-width: 300px;
  background: #efefef;
  box-sizing: border-box;
  border: solid 1px #efefef;
  cursor: pointer;
  outline: none;
  position: relative;
  padding: 10px;
  border-radius: 6px;
  font-size: 14px;

  &:hover {
    background: #cfcfcf;
  }
`;
