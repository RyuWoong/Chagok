import React from 'react';
import styled from '@emotion/native';
import {daysType} from '~/../types/chagok';
import Fonts from '~/Style/Fonts';

interface Props {
  category: string | null;
  filterList: daysType[];
}

function StatisticsInfo({category, filterList}: Props) {
  const total = filterList.reduce((acc, cur) => {
    return acc + cur.total;
  }, 0);
  return (
    <Container>
      <Label>
        {category ? `${category}(으)로 소비한 금액` : '총 소비 금액'}
      </Label>
      <Total>{total.toLocaleString('kr')}원</Total>
    </Container>
  );
}

const Container = styled.View`
  justify-content: center;
  align-items: flex-end;
  gap: 5px;
`;

const Label = styled.Text`
  font-family: ${Fonts.DNFBitBitOTF};
  font-size: 18px;
  color: ${({theme}) => theme.color};
`;
const Total = styled.Text`
  font-weight: bold;
  font-size: 24px;
  color: ${({theme}) => theme.color};
`;

export default StatisticsInfo;
