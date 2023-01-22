import styled from 'styled-components';

import * as TierListRowsStyles from '../../components/TierListRows/styles';

export const HomeContainer = styled.main`
  header {
    margin-bottom: 32px;
  }

  footer {
    display: flex;
    flex-direction: column;
    margin-top: 32px;

    a {
      color: #fafafa;
      font-size: 16px;
      margin-bottom: 8px;
    }
  }
`;

export const Title = styled.h1`
  color: #fff;
`;

export const Description = styled.h3`
  color: #fff;
  margin-bottom: 24px;
`;

export const TemplatesBox = styled.div`
  display: flex;

  div:not(:last-child) {
    margin-right: 16px;
  }
`;

export const Button = styled(TierListRowsStyles.Button)`
  margin-top: 32px;
`;
