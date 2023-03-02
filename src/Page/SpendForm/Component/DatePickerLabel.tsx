import styled from '@emotion/native';
import dayjs from 'dayjs';
import React from 'react';
import LongButton from '~/Component/Button/UI/Long';
import Fonts from '~/Style/Fonts';

interface Props {
  date: Date;
  onPress: () => void;
}

function DatePickerLabel({date, onPress}: Props) {
  return (
    <Container onPress={onPress}>
      <Label>사용 일자</Label>
      <Box>
        <Date>{dayjs(date).format('YYYY-MM-DD')}</Date>
      </Box>
    </Container>
  );
}

const Container = styled(LongButton)`
  margin-bottom: 20px;
`;

const Box = styled.View`
  border-bottom-width: 1px;
  border-color: ${({theme}) => theme.primaryColor};
  padding: 5px;
  height: 44px;
  justify-content: center;
`;

const Label = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${({theme}) => theme.color};
  margin-bottom: 5px;
`;

const Date = styled.Text`
  font-size: 16px;
  color: ${({theme}) => theme.color};
`;

export default DatePickerLabel;
