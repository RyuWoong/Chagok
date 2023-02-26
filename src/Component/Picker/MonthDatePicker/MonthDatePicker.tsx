import styled from '@emotion/native';
import dayjs from 'dayjs';
import React from 'react';
import {FlatList, Platform} from 'react-native';
import Modal from 'react-native-modal';
import PickCard from '../UI/PickCard';
import useMonthDateList from './useMonthDateList';

interface Props {
  visible: boolean;
  value: Date;
  onSelect: (date: Date) => void;
  onClose: () => void;
}

const FORMAT = 'YYYY년 MM월';

function MonthDatePicker({visible, onSelect, onClose, value}: Props) {
  const {list, moreDate} = useMonthDateList();

  const handleSelect = (date: string) => {
    onSelect(dayjs(date).toDate());
    onClose();
  };

  return (
    <Modal
      isVisible={visible}
      style={{margin: 0, justifyContent: 'flex-end'}}
      onBackdropPress={onClose}
      useNativeDriverForBackdrop={Platform.OS === 'ios'}>
      <Box>
        <Title>날짜를 선택해요.</Title>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 10}}
          data={list}
          keyExtractor={(_, index) => `date-${index}`}
          onEndReached={moreDate}
          renderItem={({item}) => {
            const dateStr = dayjs(item).format(FORMAT);
            return (
              <PickCard
                item={item}
                selected={dayjs(value).format(FORMAT) === dateStr}
                onSelect={handleSelect}
              />
            );
          }}
        />
      </Box>
    </Modal>
  );
}

const Box = styled.View`
  height: 50%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding-vertical: 10px;
  background-color: ${({theme}) => theme.backgroundColor};
`;

const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  color: ${({theme}) => theme.primaryColor};
  margin-vertical: 10px;
`;

export default MonthDatePicker;
