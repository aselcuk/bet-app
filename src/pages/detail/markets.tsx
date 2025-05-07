import { isSelectedBasketItem, logToggleBasketEvent } from '@/utils';
import type { RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { addToBetBasket, removeFromBasket } from '@/redux/betBasketSlice';
import type {
  BetBasketItem,
  BookmakerItem,
  EventDetailItem,
  MarketItem
} from '@/model';
import {
  EmptyData,
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

type EventDetailMarketsProps = {
  event: EventDetailItem;
};

export default function EventDetailMarkets(props: EventDetailMarketsProps) {
  const { event } = props;

  const dispatch = useDispatch();
  const { basket } = useSelector((state: RootState) => state.basket);

  const handleAddOdd = (basketItem: BetBasketItem) => {
    const { away_team, eventId, home_team, outcome } = basketItem;
    const eventName = `${home_team}-${away_team}`;
    dispatch(addToBetBasket(basketItem));
    logToggleBasketEvent(eventId, eventName, outcome.price, 'add_to_cart');
  };

  const handleRemoveOdd = (
    eventId: string,
    eventName: string,
    price: number
  ) => {
    dispatch(removeFromBasket(eventId));
    logToggleBasketEvent(eventId, eventName, price, 'remove_from_cart');
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
          ? handleRemoveOdd(
              eventDetail.id,
              `${eventDetail.home_team}-${eventDetail.away_team}`,
              outcome.price
            )
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

  return (
    <FlexBox direction="column" gap="var(--spacing-8)">
      {event.bookmakers.map((bookmaker, i) => (
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
                    {renderOdds(event, bookmaker, market)}
                  </FlexBox>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ))}

      {event.bookmakers.length === 0 && (
        <EmptyData>Odds for this event are not available yet.</EmptyData>
      )}
    </FlexBox>
  );
}
