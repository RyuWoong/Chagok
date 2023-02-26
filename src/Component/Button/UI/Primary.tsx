import React from 'react';
import LongButton from './Long';
import styled from '@emotion/native';
import palette from '~/Style/Palette';

interface Props {
  label: string;
  backgroundColor?: string;
  onPress: () => void;
}

function PrimaryButton({label, backgroundColor, onPress}: Props) {
  return (
    <LongButton onPress={onPress}>
      <Container backgroundColor={backgroundColor}>
        <Label>{label}</Label>
      </Container>
    </LongButton>
  );
}

const Container = styled.View<{backgroundColor: string | undefined}>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  padding-horizontal: 10px;
  width: 100%;
  height: 44px;
  background-color: ${({backgroundColor, theme}) =>
    backgroundColor ?? theme.primaryColor};
`;

const Label = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${palette.white};
`;

export default PrimaryButton;
