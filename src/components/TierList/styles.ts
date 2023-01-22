import styled, { css } from 'styled-components';

export const TierListItemsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  position: relative;
`;

interface TierListItemProps {
  imgUrl: string;
  isDraggIng?: boolean;
  isDraggOver?: boolean;
}

export const TierListItem = styled.div<TierListItemProps>`
  ${({ imgUrl, isDraggIng }) => css`
    display: inline-block;
    width: 88px;
    height: 88px;
    margin: 1px;
    background-image: ${`url(${imgUrl})`};
    background-size: cover;
    background-position: center;
    cursor: pointer;
    opacity: ${isDraggIng ? 0.2 : 1};
  `}
`;
