import React from 'react';
import styled from '@emotion/native';

interface Props {
  children: string;
}

function HeaderTitle({children}: Props) {
  return (
    <Box>
      <Text>{children}</Text>
    </Box>
  );
}

const Box = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${props => props.theme.color};
`;

export default HeaderTitle;
