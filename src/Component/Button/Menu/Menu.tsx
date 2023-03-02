import styled from '@emotion/native';
import React from 'react';

interface Props {
  onPress: () => void;
  children: string;
  error?: boolean;
}

function Menu({onPress, children, error}: Props) {
  return (
    <MenuBox>
      <MenuTouch onPress={onPress}>
        <MenuLabel error={error}>{children}</MenuLabel>
      </MenuTouch>
    </MenuBox>
  );
}

const MenuBox = styled.View`
  height: 50px;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.borderColor};
`;

const MenuTouch = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding-horizontal: 16px;
`;

const MenuLabel = styled.Text<{error?: boolean}>`
  flex: 1;
  font-size: 16px;
  font-weight: 500;
  color: ${({error, theme}) => (error ? theme.error : theme.color)};
`;

export default Menu;
