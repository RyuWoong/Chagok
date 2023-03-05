import React from 'react';
import styled from '@emotion/native';
import {ViewProps} from 'react-native';

interface Props extends ViewProps {
  children: React.ReactNode;
}

function ContainerView({children, ...props}: Props) {
  return <Container {...props}>{children}</Container>;
}

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({theme}) => theme.backgroundColor};
`;

export default ContainerView;
