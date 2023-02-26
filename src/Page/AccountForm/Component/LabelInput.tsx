import React from 'react';
import styled from '@emotion/native';
import {TextInputProps} from 'react-native';
import {useTheme} from '@emotion/react';

interface Props extends TextInputProps {
  label: string;
}

function LabelInput({label, ...props}: Props) {
  const theme = useTheme();
  return (
    <Container>
      <Label>{label}</Label>
      <Box>
        <Input
          blurOnSubmit={false}
          placeholderTextColor={theme.color}
          {...props}
        />
      </Box>
    </Container>
  );
}

const Container = styled.View`
  margin-bottom: 20px;
`;

const Label = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${({theme}) => theme.color};
  margin-bottom: 5px;
`;

const Box = styled.View`
  border-bottom-width: 1px;
  border-color: ${({theme}) => theme.primaryColor};
  padding-horizontal: 5px;
  height: 44px;
  justify-content: center;
`;

const Input = styled.TextInput`
  font-size: 16px;
  color: ${({theme}) => theme.color};
  padding: 0;
  margin: 0;
`;

export default LabelInput;
