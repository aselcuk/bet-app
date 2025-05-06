import ClassNames from 'classnames';
import { BetBasketItem } from './item';
import { useDispatch, useSelector } from 'react-redux';
import type { ComponentProps } from 'react';
import { Box, FlexBox, Typography } from '..';
import type { RootState } from '@/redux/store';
import { removeFromBasket } from '@/redux/betBasketSlice';
import type { BetBasketItem as BetBasketItemModel } from '@/model';
import './styles.scss';

export type BetBasketProps = ComponentProps<'div'>;

export const BetBasket = (props: BetBasketProps) => {
  const { className, ...rest } = props;

  const dispatch = useDispatch();
  const { basket } = useSelector((state: RootState) => state.basket);

  const matches = Object.entries(basket);
  const matchLength = matches.length;
  const isEmpty = matchLength === 0;

  const total = matches.reduce((acc, [, item]) => {
    return acc * item.outcome.price;
  }, 1);

  const classNames = ClassNames('bet-basket', {
    [`${className}`]: className
  });

  const handleRemove = (item: BetBasketItemModel) => {
    dispatch(removeFromBasket(item.eventId));
  };

  return (
    <FlexBox direction="column" className={classNames} {...rest}>
      <Box className="bet-basket-title">
        <FlexBox alignItems="center" justifyContent="center">
          <Typography variant="subtitle2" color="white">
            MY COUPON
          </Typography>
        </FlexBox>
      </Box>

      <Box className="bet-basket-content">
        {!isEmpty && (
          <Box className="bet-basket-content-title">
            <Typography variant="body2">{matchLength} Match</Typography>
          </Box>
        )}

        <Box>
          <FlexBox
            direction="column"
            gap="var(--spacing-8)"
            className="bet-basket-item-container"
          >
            {matches.map(([id, item]) => (
              <BetBasketItem
                key={`bet-basket-item-${id}`}
                basketItem={item}
                onRemove={handleRemove}
              />
            ))}
          </FlexBox>

          {isEmpty && (
            <FlexBox
              alignItems="center"
              justifyContent="center"
              style={{ minHeight: '150px' }}
            >
              <Typography variant="body2" color="black">
                There are no matches in your bet slip.
              </Typography>
            </FlexBox>
          )}
        </Box>

        {!isEmpty && (
          <Box className="bet-basket-footer">
            <Typography variant="body2">
              Total Price: {total.toFixed(2)}
            </Typography>
          </Box>
        )}
      </Box>
    </FlexBox>
  );
};
