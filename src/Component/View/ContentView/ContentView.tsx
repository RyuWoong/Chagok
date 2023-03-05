import React from 'react';
import styled from '@emotion/native';
import {ViewProps} from 'react-native';

interface Props extends ViewProps {
  children: React.ReactNode;
}

function ContentView({children, ...props}: Props) {
  return <Container {...props}>{children}</Container>;
}

const Container = styled.View`
  flex: 1;
`;

export default ContentView;
