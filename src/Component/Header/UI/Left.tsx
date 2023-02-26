import styled from '@emotion/native';
import React from 'react';

interface Props {
  children?: React.ReactNode;
}

function HeaderLeft({children}: Props) {
  return <Container>{children}</Container>;
}

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export default HeaderLeft;
