import styled from '@emotion/native';
import React from 'react';
import FloatingButton from '~/Component/Button/UI/Floating';
import PlusIcon from '~/Asset/Image/icon_plus.svg';
import {useTheme} from '@emotion/react';

interface Props {
  onPress: () => void;
}

function FabButton({onPress}: Props) {
  const theme = useTheme();
  return (
    <FloatingButton onPress={onPress}>
      <Container>
        <PlusIcon width={35} height={35} color={theme.primaryColor} />
      </Container>
    </FloatingButton>
  );
}

const Container = styled.View`
  border-radius: 50px;
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.backgroundColor};
  border-width: 1px;
  border-color: ${({theme}) => theme.primaryColor};
`;

export default FabButton;
