import styled from '@emotion/native';
import React from 'react';

interface Props {
  children?: React.ReactNode;
}

function HeaderRight({children}: Props) {
  return <Container>{children}</Container>;
}

const Container = styled.View`
  position: absolute;
  right: 0;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  z-index: 2;
`;

export default HeaderRight;
