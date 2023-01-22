import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  max-width: 200px;

  img {
    width: 100%;
    object-fit: cover;

    &:hover {
      opacity: 0.6;
      cursor: pointer;
    }
  }
`;

export const Title = styled.p`
  color: #ffffff;
  margin-bottom: 12px;
`;
