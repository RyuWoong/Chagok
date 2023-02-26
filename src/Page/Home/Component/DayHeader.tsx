import styled from '@emotion/native';
import dayjs from 'dayjs';
import React from 'react';

interface Props {
  date: Date;
  children: string;
}

const dayInKorea = ['일', '월', '화', '수', '목', '금', '토'] as const;

function DayHeader({children, date}: Props) {
  const day = `${dayjs(date).format('YYYY-MM')}-${children}`;
  return (
    <Header>
      <Title>{`${children}일 ${dayInKorea[dayjs(day).day()]}요일`}</Title>
    </Header>
  );
}

const Header = styled.View`
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.reverseBackgroundColor};
  background-color: ${({theme}) => theme.backgroundColor};
  padding-vertical: 10px;
`;

const Title = styled.Text`
  font-size: 16px;
  color: ${({theme}) => theme.color};
`;

export default DayHeader;
