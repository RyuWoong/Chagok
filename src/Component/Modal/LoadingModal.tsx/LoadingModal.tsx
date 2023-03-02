import React from 'react';
import styled from '@emotion/native';
import {ActivityIndicator, Modal} from 'react-native';
import {useTheme} from '@emotion/react';

interface Props {
  visible: boolean;
}

function LoadingModal({visible}: Props) {
  const theme = useTheme();
  return (
    <Modal visible={visible} transparent>
      <Container>
        <ActivityIndicator color={theme.primaryColor} />
      </Container>
    </Modal>
  );
}

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export default LoadingModal;
