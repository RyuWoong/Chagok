import React from 'react';
import styled from '@emotion/native';
import {TouchableOpacityProps} from 'react-native';
import {useTheme} from '@emotion/react';
import ArrowBack from '~/Asset/Image/arrow_back.svg';

interface Props extends TouchableOpacityProps {
  children?: React.ReactNode;
}

function BackButton({children, ...props}: Props) {
  const theme = useTheme();
  return (
    <Container {...props}>
      {children ?? <ArrowBack width={20} height={20} color={theme.color} />}
    </Container>
  );
}

const Container = styled.Pressable`
  padding: 5px;
`;

export default BackButton;
