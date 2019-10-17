import React from 'react';

import { Container, Header, Content } from './styles';

const ContentWrapper = ({ children, title }) => {
  return (
    <Container>
      {title && (
        <Header>
          {title}
        </Header>
      )}
      <Content>
        { children }
      </Content>
    </Container>
  )
};

export default ContentWrapper;