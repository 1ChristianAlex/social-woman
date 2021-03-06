import styled from 'styled-components';

export const Content = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  > *:not(:last-child) {
    margin-right: ${({ itemsMargin }) => itemsMargin || 20}px;
  }
`;

export const SendWrapper = styled.div`
  margin-left: auto;
`;

export const Container = styled.div`
  width: 100%;
`;

export const PostWrapper = styled.div`
  > * {
    margin-bottom: 10px;
  }
`;
