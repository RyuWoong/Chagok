import styled from '@emotion/native';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({theme}) => theme.backgroundColor};
`;

const Content = styled.View`
  flex: 1;
`;

export {Container, Content};
