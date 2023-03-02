import styled from '@emotion/native';
import React from 'react';

interface Props {
  children?: React.ReactNode;
}

function HeaderLeft({children}: Props) {
  return <Container>{children}</Container>;
}

const Container = styled.View`
  position: absolute;
  left: 0;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  z-index: 2;
`;

export default HeaderLeft;
