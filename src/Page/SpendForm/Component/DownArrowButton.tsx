import styled from '@emotion/native';
import {useTheme} from '@emotion/react';
import React from 'react';
import DownArrow from '../../../Asset/Image/arrow_down.svg';
interface Props {
  onPress: () => void;
}

function DownArrowButton({onPress}: Props) {
  const theme = useTheme();
  return (
    <Container onPress={onPress}>
      <DownArrow width={40} height={40} color={theme.color} />
    </Container>
  );
}

const Container = styled.TouchableOpacity`
  padding: 5px;
`;

export default DownArrowButton;
