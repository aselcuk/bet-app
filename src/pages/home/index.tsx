/* eslint-disable @typescript-eslint/no-unused-vars */
import Filter from './filter';
import { useEffect } from 'react';
import ClassNames from 'classnames';
import { Link } from 'react-router-dom';
import type { SportsItem } from '@/model';
import type { RootState } from '@/redux/store';
import { getEvents, getSports } from '@/services';
import { useDispatch, useSelector } from 'react-redux';
import {
  getGroupedSportsMap,
  isSelectedEventItem,
  requestWithRateLimit
} from '@/utils';
import {
  updateEvents,
  updateGroupedSports,
  updateSelectedTab
} from '@/redux/eventsSlice';
import {
  Box,
  FlexBox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Tabs,
  Tab,
  TabPanel,
  Typography
} from '@/components';
import './styles.scss';

export default function HomePage() {
  const dispatch = useDispatch();
  const { basket } = useSelector((state: RootState) => state.basket);
  const { events, groupedSports, selectedTabIndex } = useSelector(
    (state: RootState) => state.events
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
            {events.map((event, i) => (
              <Table key={`event-table-${i}`}>
                <TableHead>
                  <TableRow>
                    <TableHeadCell style={{ minWidth: '380px' }}>
                      <Typography variant="subtitle2" color="white">
                        {event[0]?.sport_title || '-'}
                      </Typography>
                    </TableHeadCell>
                    <TableHeadCell>
                      <Typography variant="subtitle2" color="white">
                        Commence
                      </Typography>
                    </TableHeadCell>
                    <TableHeadCell>
                      <Typography
                        align="center"
                        variant="subtitle2"
                        color="white"
                      >
                        +
                      </Typography>
                    </TableHeadCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {event.map((e) => (
                    <TableRow key={`event-table-row-${e.id}`}>
                      <TableCell>
                        <Typography variant="body2" weight={500}>
                          {e.home_team} - {e.away_team}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" weight={500}>
                          {e.commence_time}
                        </Typography>
                      </TableCell>
                      <TableCell
                        className={ClassNames({
                          'home-page-event-selected': isSelectedEventItem(
                            e.id,
                            basket
                          )
                        })}
                      >
                        <Link to={`/detail/${e.sport_key}/${e.id}`}>
                          <Typography variant="subtitle2">→</Typography>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ))}
          </TabPanel>
        ))}
      </Box>
    </FlexBox>
  );
}
