import EventDetailOdds from './odds';
import type { EventDetailItem } from '@/model';
import {
  EmptyData,
  FlexBox,
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
                    <EventDetailOdds
                      bookmaker={bookmaker}
                      event={event}
                      market={market}
                    />
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
