import styled from '@emotion/native';
import dayjs from 'dayjs';
import React, {memo, useCallback} from 'react';
import {FlatList, Platform} from 'react-native';
import Modal from 'react-native-modal';
import PickCard from '../PickCard/PickCard';
import useMonthDateList from './useMonthDateList';

interface Props {
  visible: boolean;
  value: Date;
  onSelect: (date: Date) => void;
  onClose: () => void;
}

const FORMAT = 'YYYY년 MM월';

function MonthDatePicker({visible, onSelect, onClose, value}: Props) {
  console.log('MonthDatePicker');
  const {list, moreDate} = useMonthDateList();

  const handleSelect = useCallback(
    (date: string) => {
      onSelect(dayjs(date).toDate());
      onClose();
    },
    [onSelect, onClose],
  );

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
          keyExtractor={date => `date-${dayjs(date).format('YYYY-MM')}`}
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

export default memo(MonthDatePicker);
