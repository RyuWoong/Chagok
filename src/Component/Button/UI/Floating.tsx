import React from 'react';
import styled from '@emotion/native';
import {TouchableOpacityProps} from 'react-native';

interface Props extends TouchableOpacityProps {
  children: React.ReactNode;
}

function FloatingButton({children, ...props}: Props) {
  return <Container {...props}>{children}</Container>;
}

const Container = styled.TouchableOpacity`
  position: absolute;
  bottom: 20px;
  right: 20px;
`;

export default FloatingButton;
