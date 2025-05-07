/* eslint-disable @typescript-eslint/no-unused-vars */
import Filter from './filter';
import Bulletin from './bulletin';
import { useEffect } from 'react';
import type { SportsItem } from '@/model';
import type { RootState } from '@/redux/store';
import { getEvents, getSports } from '@/services';
import { useDispatch, useSelector } from 'react-redux';
import { updateEvents, updateFilteredEvents } from '@/redux/eventsSlice';
import { updateGroupedSports, updateSelectedTab } from '@/redux/filtersSlice';
import { getGroupedSportsMap, requestWithRateLimit } from '@/utils';
import {
  Box,
  FlexBox,
  Tabs,
  Tab,
  TabPanel,
  Typography,
  EmptyData
} from '@/components';
import './styles.scss';

export default function HomePage() {
  const dispatch = useDispatch();
  const { events, filteredEvents } = useSelector(
    (state: RootState) => state.events
  );
  const { groupedSports, selectedTabIndex, searchText } = useSelector(
    (state: RootState) => state.filters
  );

  const handleBulkRequests = async (sportsItems: [string, SportsItem[]]) => {
    const [_, itemList] = sportsItems;

    const resultsArray: any[] = [];

    await requestWithRateLimit(
      itemList,
      (item) => getEvents(item.key),
      25,
      (res, i) => {
        resultsArray[i] = res;
      }
    );

    dispatch(updateEvents(resultsArray));
    dispatch(updateFilteredEvents(resultsArray));
  };

  const handleOnChange = async (index: number) => {
    if (selectedTabIndex !== index) {
      dispatch(updateSelectedTab(index));

      if (groupedSports) {
        const sportsItems = Object.entries(groupedSports)[index];
        handleBulkRequests(sportsItems);
      }
    }
  };

  useEffect(() => {
    if (events.length === 0) {
      getSports().then(async (res: Array<SportsItem>) => {
        const groupedItems = getGroupedSportsMap(res);
        dispatch(updateGroupedSports(groupedItems));

        const sportsItems = Object.entries(groupedItems)[0];
        handleBulkRequests(sportsItems);
      });
    }
  }, []);

  const renderEmptyData = () => {
    if (filteredEvents.length === 0 && searchText) {
      return <EmptyData>No matches for your search term.</EmptyData>;
    }

    if (filteredEvents.length === 0) {
      return (
        <EmptyData>There are no matches available in this category.</EmptyData>
      );
    }
  };

  if (!groupedSports) {
    return <></>;
  }

  return (
    <FlexBox className="home-page" direction="column" gap="var(--spacing-16)">
      <Box className="home-page-filter">
        <Filter />
      </Box>

      <Box>
        <Tabs
          index={selectedTabIndex}
          onChange={handleOnChange}
          style={{
            maxWidth: '620px',
            overflowX: 'auto',
            backgroundColor: 'var(--color-neutral)',
            padding: 'var(--spacing-8)'
          }}
        >
          {Object.keys(groupedSports).map((k) => (
            <Tab key={`tab-${k}`}>
              <Typography variant="subtitle2" style={{ whiteSpace: 'nowrap' }}>
                {k}
              </Typography>
            </Tab>
          ))}
        </Tabs>

        {Object.entries(groupedSports).map((_, i) => (
          <TabPanel
            key={`tab-panel-${i}`}
            value={i}
            index={selectedTabIndex}
            style={{ paddingTop: 'var(--spacing-8)' }}
          >
            {filteredEvents.map((eventList, i) => (
              <Bulletin key={`bulletin-${i}`} events={eventList} />
            ))}

            {renderEmptyData()}
          </TabPanel>
        ))}
      </Box>
    </FlexBox>
  );
}
