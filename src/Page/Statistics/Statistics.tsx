import styled from '@emotion/native';
import React, {useCallback, useEffect} from 'react';
import {SectionList} from 'react-native';
import {PieChartSelectEvent} from 'react-native-charts-wrapper';
import {Category, dayType} from '~/../types/chagok';
import ListEmptyScreen from '~/Component/View/ListEmptyScreen/ListEmptyScreen';
import LoadingFullScreen from '~/Component/View/LoadingFullScreen/LoadingFullScreen';
import DayCard from '../Home/Component/DayCard';
import DayHeader from '../Home/Component/DayHeader';
import useDate from '../Home/Hook/useDate';
import CategoryCharts from './Component/CategoryCharts';
import DateLabelButton from './Component/DateLabelButton';
import StatisticsInfo from './Component/StatisticsInfo';
import useAnalyticsList from './Hook/useAnalyticsList';

function Statistics() {
  const {date, list, handleDate} = useDate();
  const {filterList, category, setBaseList, handleCategory} =
    useAnalyticsList();
  const handleSelect = useCallback(
    (event: PieChartSelectEvent) => {
      const entry = event.nativeEvent;
      console.log(entry);
      if (entry?.label) {
        handleCategory(entry.label as Category);
      } else {
        handleCategory(null);
      }
    },
    [handleCategory],
  );

  useEffect(() => {
    if (list) {
      setBaseList(list);
    }
  }, [list, setBaseList]);

  if (!list) {
    return <LoadingFullScreen />;
  }

  return (
    <Container>
      <DateLabelButton date={date} handleDate={handleDate} />
      {list.length === 0 ? (
        <ListEmptyScreen />
      ) : (
        <SectionList
          sections={filterList ?? []}
          bounces={false}
          ListHeaderComponent={
            filterList ? (
              <>
                <CategoryCharts list={list} handleSelect={handleSelect} />
                <StatisticsInfo category={category} filterList={filterList} />
              </>
            ) : (
              <></>
            )
          }
          contentContainerStyle={{paddingHorizontal: 20}}
          stickySectionHeadersEnabled={true}
          keyExtractor={(item: dayType) => `Monthly-${item.id}`}
          renderSectionHeader={({section: {title}}) => (
            <DayHeader date={date}>{title}</DayHeader>
          )}
          renderItem={({item}) => <DayCard item={item} />}
        />
      )}
    </Container>
  );
}

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({theme}) => theme.backgroundColor};
`;

export default Statistics;
