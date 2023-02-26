import styled from '@emotion/native';
import dayjs from 'dayjs';
import React, {useCallback, useState} from 'react';
import MonthDatePicker from '~/Component/Picker/MonthDatePicker/MonthDatePicker';
import useMonthly from '../Hook/useMonthly';

function MonthlyTotal() {
  const [pickerVisible, setPickerVisible] = useState(false);
  const {date, total, handleDate} = useMonthly();
  const dayjsDate = dayjs(date);
  const monthLabel =
    dayjsDate.year() === dayjs().year()
      ? dayjsDate.month() + 1
      : dayjsDate.format('YYYY년 MM');

  const isNowMonth = dayjsDate.isSame(dayjs(), 'month');

  const onShow = useCallback(() => {
    setPickerVisible(true);
  }, []);

  const onClose = useCallback(() => {
    setPickerVisible(false);
  }, []);

  return (
    <Container>
      <Button onPress={onShow}>
        <Date>{monthLabel}월</Date>
      </Button>
      <Title>{isNowMonth ? '이번' : '지난'} 달에 소비한 돈이에요.</Title>
      <Box>
        <Money>{total.toLocaleString('ko-KR')}</Money>
        <Label>원</Label>
      </Box>
      <MonthDatePicker
        visible={pickerVisible}
        value={date}
        onSelect={handleDate}
        onClose={onClose}
      />
    </Container>
  );
}

const Container = styled.View`
  padding-vertical: 10px;
  padding-horizontal: 20px;
`;

const Button = styled.TouchableOpacity``;

const Date = styled.Text`
  font-size: 20px;
  font-weight: 500;
  color: ${props => props.theme.color};
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${props => props.theme.color};
`;

const Box = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Money = styled.Text`
  font-size: 40px;
  font-weight: bold;
  line-height: 40px;
  color: ${props => props.theme.primaryColor};
`;

const Label = styled.Text`
  font-size: 20px;
  font-weight: 500;
  color: ${props => props.theme.color};
`;

export default MonthlyTotal;
