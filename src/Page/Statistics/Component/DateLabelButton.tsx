import styled from '@emotion/native';
import dayjs from 'dayjs';
import React, {useCallback, useState} from 'react';
import MonthDatePicker from '~/Component/Picker/MonthDatePicker/MonthDatePicker';

interface Props {
  date: Date;
  handleDate: (date: Date) => void;
}

function DateLabelButton({date, handleDate}: Props) {
  const [pickerVisible, setPickerVisible] = useState(false);
  const dayjsDate = dayjs(date);
  const monthLabel =
    dayjsDate.year() === dayjs().year()
      ? dayjsDate.month() + 1
      : dayjsDate.format('YYYY년 MM');

  const onShow = useCallback(() => {
    setPickerVisible(true);
  }, []);

  const onClose = useCallback(() => {
    setPickerVisible(false);
  }, []);

  return (
    <Button onPress={onShow}>
      <Date>{monthLabel}월</Date>
      <MonthDatePicker
        visible={pickerVisible}
        value={date}
        onSelect={handleDate}
        onClose={onClose}
      />
    </Button>
  );
}

const Button = styled.TouchableOpacity`
  padding-vertical: 15px;
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.borderColor};
`;
const Date = styled.Text`
  font-size: 20px;
  font-weight: 500;
  color: ${props => props.theme.color};
  text-align: center;
`;

export default DateLabelButton;
