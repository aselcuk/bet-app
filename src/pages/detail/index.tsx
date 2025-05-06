import { getEventOdds } from '@/services';
import { useEffect, useState } from 'react';
import type { RootState } from '@/redux/store';
import { isSelectedBasketItem } from '@/utils';
import { useDispatch, useSelector } from 'react-redux';
import { addToBetBasket, removeFromBasket } from '@/redux/betBasketSlice';
import { useNavigate, useParams } from 'react-router-dom';
import type {
  BetBasketItem,
  BookmakerItem,
  EventDetailItem,
  MarketItem
} from '@/model';
import {
  Box,
  FlexBox,
  OddButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Typography
} from '@/components';
import './styles.scss';

export default function DetailPage() {
  const navigate = useNavigate();
  const { id, sport } = useParams();
  const dispatch = useDispatch();
  const { basket } = useSelector((state: RootState) => state.basket);

  const [eventDetail, setEventDetail] = useState<EventDetailItem>();

  useEffect(() => {
    if (id && sport) {
      getEventOdds(id, sport).then((res: EventDetailItem) => {
        setEventDetail(res);
      });
    }
  }, [id, sport]);

  const handleAddOdd = (basketItem: BetBasketItem) => {
    dispatch(addToBetBasket(basketItem));
  };

  const handleRemoveOdd = (id: string) => {
    dispatch(removeFromBasket(id));
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const renderOdds = (
    eventDetail: EventDetailItem,
    bookmaker: BookmakerItem,
    market: MarketItem
  ) => {
    return market.outcomes.map((outcome, i) => {
      const isSelected = isSelectedBasketItem(
        eventDetail.id,
        bookmaker.key,
        market.key,
        outcome.name,
        basket
      );

      const clickFn = () => {
        return isSelected
          ? handleRemoveOdd(eventDetail.id)
          : handleAddOdd({
              outcome,
              eventId: eventDetail.id,
              away_team: eventDetail.away_team,
              commence_time: eventDetail.commence_time,
              home_team: eventDetail.home_team,
              sport_title: eventDetail.sport_title,
              bookmakerName: bookmaker.key,
              marketName: market.key
            });
      };

      return (
        <OddButton
          key={`outcome-item-${i}`}
          name={outcome.name}
          price={outcome.price}
          selected={isSelected}
          onClick={clickFn}
        />
      );
    });
  };

  if (!eventDetail) {
    return <></>;
  }

  return (
    <FlexBox className="detail-page" direction="column" gap="var(--spacing-16)">
      <Box>
        <FlexBox
          alignItems="center"
          justifyContent="center"
          direction="column"
          gap="var(--spacing-8)"
          className="detail-page-event"
        >
          <Box>
            <Typography variant="body2">{eventDetail.sport_title}</Typography>
          </Box>

          <Box>
            <Typography color="black" variant="subtitle1">
              {eventDetail.home_team} - {eventDetail.away_team}
            </Typography>
          </Box>

          <Box>
            <Typography variant="caption">
              {eventDetail.commence_time}
            </Typography>
          </Box>

          <Box className="detail-page-back" onClick={handleGoBack}>
            <Typography variant="subtitle1">←</Typography>
          </Box>
        </FlexBox>
      </Box>

      <Box>
        <FlexBox direction="column" gap="var(--spacing-8)">
          {eventDetail.bookmakers.map((bookmaker, i) => (
            <Table key={`bookmaker-table-${i}`}>
              <TableHead>
                <TableRow>
                  <TableHeadCell style={{ minWidth: '300px' }}>
                    <Typography variant="subtitle2" color="white">
                      {bookmaker.title}
                    </Typography>
                  </TableHeadCell>
                  <TableHeadCell>
                    <Typography variant="subtitle2" color="white">
                      Outcomes
                    </Typography>
                  </TableHeadCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {bookmaker.markets.map((market, i) => (
                  <TableRow key={`market-item-${i}`}>
                    <TableCell>
                      <Typography variant="body2" weight={500}>
                        {market.key}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <FlexBox
                        alignItems="center"
                        wrap="nowrap"
                        gap="var(--spacing-8)"
                      >
                        {renderOdds(eventDetail, bookmaker, market)}
                      </FlexBox>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ))}
        </FlexBox>
      </Box>
    </FlexBox>
  );
}
