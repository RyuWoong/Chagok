import React from 'react';
import {SectionList} from 'react-native';
import {dayType} from '~/../types/chagok';
import useMonthly from '../Hook/useMonthly';
import DayCard from './DayCard';
import DayHeader from './DayHeader';
import ListEmptyScreen from '../../../Component/View/ListEmptyScreen/ListEmptyScreen';
import LoadingFullScreen from '~/Component/View/LoadingFullScreen/LoadingFullScreen';

interface Props {}

function MonthlyList({}: Props) {
  const {date, list} = useMonthly();

  if (!list) {
    return <LoadingFullScreen />;
  }

  if (list.length === 0) {
    return <ListEmptyScreen />;
  }

  return (
    <SectionList
      bounces={false}
      initialNumToRender={10}
      sections={list}
      contentContainerStyle={{paddingHorizontal: 20}}
      stickySectionHeadersEnabled={true}
      keyExtractor={(item: dayType) => `Monthly-${item.id}`}
      renderSectionHeader={({section: {title}}) => (
        <DayHeader date={date}>{title}</DayHeader>
      )}
      renderItem={DayCard}
    />
  );
}

export default MonthlyList;
