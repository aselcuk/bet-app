import { Box, FlexBox, OddButton, Typography } from '..';
import ClassNames from 'classnames';
import type { ComponentProps } from 'react';
import type { BetBasketItem as BetBasketItemModel } from '@/model';
import { formatMatchDate } from '@/utils';

export type BetBasketItemProps = ComponentProps<'div'> & {
  basketItem: BetBasketItemModel;
  onRemove?: (item: BetBasketItemModel) => void;
};

export const BetBasketItem = (props: BetBasketItemProps) => {
  const { className, basketItem, onRemove, ...rest } = props;

  const classNames = ClassNames('bet-basket-item', {
    [`${className}`]: className
  });

  return (
    <FlexBox
      direction="column"
      gap="var(--spacing-6)"
      className={classNames}
      {...rest}
    >
      <Box>
        <FlexBox
          wrap="nowrap"
          gap="var(--spacing-8)"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box style={{ minWidth: 0 }}>
            <Typography truncate variant="subtitle2" color="black">
              {basketItem.home_team} - {basketItem.away_team}
            </Typography>
          </Box>

          <Box
            className="bet-basket-item-remove"
            onClick={() => onRemove?.(basketItem)}
          >
            <Typography variant="body2">✕</Typography>
          </Box>
        </FlexBox>
      </Box>

      <Box>
        <Typography variant="body2">
          {basketItem.sport_title} - {basketItem.marketName}
        </Typography>
      </Box>

      <Box>
        <FlexBox
          wrap="nowrap"
          alignItems="flex-end"
          justifyContent="space-between"
        >
          <Box>
            <OddButton
              name={basketItem.outcome.name}
              price={basketItem.outcome.price}
              className="bet-basket-item-odd-button"
            />
          </Box>

          <Box>
            <Typography variant="caption">
              {formatMatchDate(basketItem.commence_time)}
            </Typography>
          </Box>
        </FlexBox>
      </Box>
    </FlexBox>
  );
};
