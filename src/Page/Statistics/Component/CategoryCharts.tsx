import styled from '@emotion/native';
import {useTheme} from '@emotion/react';
import React, {memo, useEffect, useMemo, useState} from 'react';
import {processColor, StyleSheet} from 'react-native';
import {
  PieChart,
  PieChartSelectEvent,
  PieData,
} from 'react-native-charts-wrapper';
import {daysType} from '~/../types/chagok';
import Fonts from '~/Style/Fonts';
import {CATEGROY} from '~/Utils/constant';

interface Props {
  list: daysType[] | null;
  handleSelect: (event: PieChartSelectEvent) => void;
}

function CategoryCharts({list, handleSelect}: Props) {
  const theme = useTheme();

  const categoryData = useMemo(
    () =>
      list
        ? list
            .map(item => item.data)
            .flat()
            .reduce((prev, next) => {
              prev[next.category] += 1;
              return prev;
            }, Object.fromEntries(CATEGROY.map(item => [item, 0])))
        : null,
    [list],
  );

  const [data, setData] = useState<PieData>();

  useEffect(() => {
    const values = categoryData
      ? Object.entries(categoryData)
          .filter(item => item[1] !== 0)
          .map(item => ({label: item[0], value: item[1]}))
      : [];

    setData({
      dataSets: [
        {
          label: '카테고리',
          values,
          config: {
            colors: [
              processColor('#C0FF8C'),
              processColor('#FFF78C'),
              processColor('#FFD08C'),
              processColor('#8CEAFF'),
              processColor('#CFE5CC'),
              processColor('#EF3C23'),
              processColor('#FF8C9D'),
            ],
            valueTextSize: 20,
            valueTextColor: processColor(theme.color),
            sliceSpace: 5,
            selectionShift: 13,
            valueFormatter: "#.#'%'",
            valueLineColor: processColor('green'),
            valueLinePart1Length: 0.5,
          },
        },
      ],
    });
  }, [categoryData, theme]);

  return (
    <Container>
      <PieChart
        style={styles.chart}
        logEnabled={true}
        chartBackgroundColor={processColor(theme.backgroundColor)}
        data={data}
        legend={{enabled: false}}
        highlights={[{x: 5}]}
        entryLabelColor={processColor(theme.color)}
        entryLabelTextSize={20}
        entryLabelFontFamily={Fonts.DNFBitBitOTF}
        drawEntryLabels={true}
        rotationEnabled={false}
        rotationAngle={50}
        usePercentValues={true}
        styledCenterText={{
          text: '카테고리',
          color: processColor(theme.primaryColor),
          fontFamily: Fonts.DNFBitBitOTF,
          size: 20,
        }}
        centerTextRadiusPercent={100}
        holeRadius={40}
        holeColor={processColor(theme.backgroundColor)}
        transparentCircleRadius={45}
        transparentCircleColor={processColor('#f0f0f088')}
        maxAngle={360}
        onSelect={handleSelect}
        onChange={event => console.log(event.nativeEvent)}
      />
    </Container>
  );
}

const Container = styled.View`
  width: 100%;
  height: 400px;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chart: {
    flex: 1,
  },
});

export default memo(CategoryCharts);
