import React, {memo, useCallback} from 'react';
import styled from '@emotion/native';
import Check from '~/Asset/Image/check.svg';
import {useTheme} from '@emotion/react';
import dayjs from 'dayjs';

type Props = {
  item: string | Date;
  selected: boolean;
  onSelect: (value: any) => void;
};

function PickCard({item, selected, onSelect}: Props) {
  const theme = useTheme();
  const onPress = useCallback(() => {
    onSelect(item);
  }, [onSelect, item]);

  return (
    <Card>
      <Touchable onPress={onPress}>
        <CardLabel>
          {typeof item === 'string' ? item : dayjs(item).format('YYYY년 MM월')}
        </CardLabel>
        <CheckBox>
          {selected && (
            <Check color={theme.primaryColor} width={24} height={24} />
          )}
        </CheckBox>
      </Touchable>
    </Card>
  );
}

const Card = styled.View`
  border-bottom-width: 0px;
  border-bottom-color: ${({theme}) => theme.primaryColor};
`;
const Touchable = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding-vertical: 15px;
`;

const CheckBox = styled.View`
  width: 30px;
  height: 30px;
  margin-left: 5px;
  justify-content: center;
  align-items: center;
`;

const CardLabel = styled.Text`
  flex: 1;
  font-size: 16px;
  font-weight: 500;
  color: ${({theme}) => theme.primaryColor};
`;

export default memo(PickCard);
