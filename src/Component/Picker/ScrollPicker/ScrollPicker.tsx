import styled from '@emotion/native';
import React from 'react';
import {FlatList, Platform} from 'react-native';
import Modal from 'react-native-modal';
import PickCard from '../UI/PickCard';

interface Props {
  title: string;
  value: string;
  data: readonly any[];
  visible: boolean;
  onClose: () => void;
  onSelect: (value: any) => void;
}

function ScrollPicker({visible, title, data, value, onSelect, onClose}: Props) {
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      style={{margin: 0, justifyContent: 'flex-end'}}
      useNativeDriverForBackdrop={Platform.OS === 'ios'}>
      <Box>
        <Title>{title}</Title>
        <FlatList
          data={data}
          contentContainerStyle={{paddingHorizontal: 20}}
          keyExtractor={item => `picker-${item}`}
          renderItem={({item}) => (
            <PickCard
              item={item}
              onSelect={onSelect}
              selected={value === item}
            />
          )}
        />
      </Box>
    </Modal>
  );
}

const Box = styled.View`
  border-radius: 5px;
  background-color: ${({theme}) => theme.backgroundColor};
  height: 40%;
`;

const Title = styled.Text`
  padding: 20px;
  font-size: 24px;
  font-weight: bold;
  color: ${({theme}) => theme.primaryColor};
`;

export default ScrollPicker;
