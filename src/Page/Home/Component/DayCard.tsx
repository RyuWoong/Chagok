import React from 'react';
import styled from '@emotion/native';
import {dayType} from '~/../types/chagok';
import {useNavigation} from '@react-navigation/native';
import {HomePageProps} from '../Home';
import Fonts from '~/Style/Fonts';

interface Props {
  item: dayType;
}

function DayCard({item}: Props) {
  const navigation = useNavigation<HomePageProps['navigation']>();

  const goForm = () => {
    navigation.navigate('Form', item);
  };

  return (
    <Container activeOpacity={0.4} onPress={goForm}>
      <Box>
        <Category>● {item.category}</Category>
        <Title>{item.title}</Title>
      </Box>
      <PriceBox>
        <Price>{item.price.toLocaleString('ko-KR')}원</Price>
      </PriceBox>
    </Container>
  );
}

const Container = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  background-color: ${({theme}) => theme.backgroundColor};
  margin-bottom: 5px;
  flex-direction: row;
  align-items: center;
`;

const Box = styled.View`
  flex: 1;
  justify-content: center;
`;

const Category = styled.Text`
  font-size: 14px;
  color: ${({theme}) => theme.subColor};
  font-family: ${Fonts.DNFBitBitOTF};
  margin-bottom: 3px;
`;

const Title = styled.Text`
  font-size: 18px;
  color: ${({theme}) => theme.color};
`;

const PriceBox = styled.View`
  height: 100%;
  justify-content: flex-end;
`;

const Price = styled.Text`
  font-size: 20px;
  font-weight: 600;
  align-self: flex-end;
  color: ${({theme}) => theme.color};
`;

export default DayCard;
