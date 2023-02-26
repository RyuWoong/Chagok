import React from 'react';
import styled from '@emotion/native';

interface Props {
  children: React.ReactNode;
  onPress: () => void;
}

/*
 * 개인정보처리방침, 이용약관 등의 버튼을 만드는 컴포넌트 입니다.
 * 기능 보단 스타일을 획일화 하는 컴포넌트 입니다.
 */

function PolicyButton({children, onPress}: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Label>{children}</Label>
    </TouchableOpacity>
  );
}

const TouchableOpacity = styled.TouchableOpacity``;

const Label = styled.Text`
  color: ${({theme}) => theme.subColor};
  font-size: 12px;
  text-align: center;
`;

export default PolicyButton;
