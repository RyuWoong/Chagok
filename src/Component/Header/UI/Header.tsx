import React from 'react';
import styled from '@emotion/native';
import HeaderLeft from './Left';
import HeaderTitle from './Title';
import HeaderRight from './Right';

interface Props {
  children: React.ReactNode;
}

function Header({children}: Props) {
  return <Container>{children}</Container>;
}

const Container = styled.View`
  position: relative;
  flex-direction: row;
  align-items: center;
  margin: 0 15px;
  height: 54px;
`;

Header.Left = HeaderLeft;
Header.Title = HeaderTitle;
Header.Right = HeaderRight;

export default Header;
