import styled from 'styled-components';

export const LayoutContainer = styled.div`
  max-width: 74rem;
  min-height: 100vh;
  padding: 2.5rem;
  margin: 0 auto;

  background: ${(props) => props.theme['gray-800']};
  border-radius: 8px;

  display: flex;
  flex-direction: column;
`;
