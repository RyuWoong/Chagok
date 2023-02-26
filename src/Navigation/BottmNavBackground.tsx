import styled from '@emotion/native';
import React from 'react';

function BottmNavBackground() {
  return <Container />;
}
const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.backgroundColor};
`;

export default BottmNavBackground;
