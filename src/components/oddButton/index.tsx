import ClassNames from 'classnames';
import type { ComponentProps } from 'react';
import { Box, Typography } from '@/components';
import './styles.scss';

type OddButtonProps = ComponentProps<'div'> & {
  price: number;
  name: string;
  point?: string;
  selected?: boolean;
};

export const OddButton = (props: OddButtonProps) => {
  const { name, price, className, selected, ...rest } = props;

  const classNames = ClassNames('odd-button', {
    'odd-button-selected': selected,
    [`${className}`]: className
  });

  return (
    <Box className={classNames} {...rest}>
      <Box className="odd-button-name">
        <Typography truncate variant="body2">
          {name}
        </Typography>
      </Box>
      <Box className="odd-button-price">
        <Typography variant="body2" color="black">
          {Number(price).toFixed(2)}
        </Typography>
      </Box>
    </Box>
  );
};
