import styled from '@emotion/native';
import {Platform} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({theme}) => theme.backgroundColor};
`;

const Content = styled.View`
  flex: 1;
`;

export {Container, Content};
