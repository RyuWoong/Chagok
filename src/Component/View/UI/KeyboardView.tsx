import React, {ReactNode} from 'react';
import {KeyboardAvoidingViewProps} from 'react-native';
import styled from '@emotion/native';

interface Props extends KeyboardAvoidingViewProps {
  children: ReactNode;
}

function KeyboardView({children, ...props}: Props) {
  return (
    <KeyboardAvoidView behavior="padding" {...props}>
      {children}
    </KeyboardAvoidView>
  );
}

const KeyboardAvoidView = styled.KeyboardAvoidingView`
  flex: 1;
`;

export default KeyboardView;
