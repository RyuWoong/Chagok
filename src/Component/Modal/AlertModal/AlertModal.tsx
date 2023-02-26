import styled from '@emotion/native';
import React, {memo} from 'react';
import {Platform} from 'react-native';
import Modal from 'react-native-modal';

interface Props {
  title?: string;
  message?: string;
  visible: boolean;
  onConfirm?: () => void;
  onCancel: () => void;
}

export function AlertModal({
  visible,
  title = '',
  message = '',
  onConfirm,
  onCancel,
}: Props) {
  return (
    <Modal
      isVisible={visible}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      useNativeDriverForBackdrop={Platform.OS === 'ios'}>
      <Box>
        <MainGroup>
          <Title numberOfLines={1}>{title}</Title>
          <Message>{message}</Message>
        </MainGroup>
        <ButtonGroup>
          <Button onPress={onConfirm}>
            <ConfirmText>확인</ConfirmText>
          </Button>
          <Button onPress={onCancel}>
            <ButtonText>취소</ButtonText>
          </Button>
        </ButtonGroup>
      </Box>
    </Modal>
  );
}

const Box = styled.View`
  border-radius: 10px;
  background-color: ${({theme}) => theme.backgroundColor};
  border-width: 1px;
  border-color: ${({theme}) => theme.borderColor};
  margin-horizontal: 20px;
`;

const MainGroup = styled.View`
  padding: 20px;
  gap: 5px;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  color: ${({theme}) => theme.primaryColor};
`;

const Message = styled.Text`
  font-size: 16px;
  text-align: center;
  color: ${({theme}) => theme.color};
`;

const ButtonGroup = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Button = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 15px;
`;

const ConfirmText = styled.Text`
  color: ${({theme}) => theme.primaryColor};
  font-weight: bold;
`;

const ButtonText = styled.Text`
  color: ${({theme}) => theme.color};
  font-weight: 500;
`;
