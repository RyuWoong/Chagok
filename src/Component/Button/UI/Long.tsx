import React from 'react';
import styled from '@emotion/native';
import {PressableProps} from 'react-native';

interface Props extends PressableProps {
  children: React.ReactNode;
}

function LongButton({children, ...props}: Props) {
  return <Container {...props}>{children}</Container>;
}

const Container = styled.Pressable`
  width: 100%;
`;

export default LongButton;
