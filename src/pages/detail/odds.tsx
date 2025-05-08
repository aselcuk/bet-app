import type { RootState } from '@/redux/store';
import { FlexBox, OddButton } from '@/components';
import { useDispatch, useSelector } from 'react-redux';
import { isSelectedBasketItem, logToggleBasketEvent } from '@/utils';
import { addToBetBasket, removeFromBasket } from '@/redux/betBasketSlice';
import type {
  BetBasketItem,
  BookmakerItem,
  EventDetailItem,
  MarketItem
} from '@/model';

type EventDetailOddsProps = {
  market: MarketItem;
  event: EventDetailItem;
  bookmaker: BookmakerItem;
};

export default function EventDetailOdds(props: EventDetailOddsProps) {
  const { event, bookmaker, market } = props;

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

  return (
    <FlexBox alignItems="center" wrap="nowrap" gap="var(--spacing-8)">
      {market.outcomes.map((outcome, i) => {
        const isSelected = isSelectedBasketItem(
          event.id,
          bookmaker.key,
          market.key,
          outcome.name,
          basket
        );

        const clickFn = () => {
          return isSelected
            ? handleRemoveOdd(
                event.id,
                `${event.home_team}-${event.away_team}`,
                outcome.price
              )
            : handleAddOdd({
                outcome,
                eventId: event.id,
                away_team: event.away_team,
                commence_time: event.commence_time,
                home_team: event.home_team,
                sport_title: event.sport_title,
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
      })}
    </FlexBox>
  );
}
