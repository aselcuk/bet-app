import ClassNames from 'classnames';
import { Link } from 'react-router-dom';
import type { EventItem } from '@/model';
import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';
import { formatMatchDate, isSelectedEventItem } from '@/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Typography
} from '@/components';

type BulletinProps = {
  events: Array<EventItem>;
};

export default function Bulletin(props: BulletinProps) {
  const { events } = props;

  const { basket } = useSelector((state: RootState) => state.basket);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeadCell style={{ minWidth: '380px' }}>
            <Typography variant="subtitle2" color="white">
              {events[0].sport_title || '-'}
            </Typography>
          </TableHeadCell>
          <TableHeadCell style={{ minWidth: '148px' }}>
            <Typography variant="subtitle2" color="white">
              Commence Time
            </Typography>
          </TableHeadCell>
          <TableHeadCell>
            <Typography align="center" variant="subtitle2" color="white">
              +
            </Typography>
          </TableHeadCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {events.map((e) => (
          <TableRow key={`event-table-row-${e.id}`}>
            <TableCell>
              <Typography variant="body2" weight={500}>
                {e.home_team} - {e.away_team}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body2" weight={500}>
                {formatMatchDate(e.commence_time)}
              </Typography>
            </TableCell>
            <TableCell
              className={ClassNames({
                'home-page-event-selected': isSelectedEventItem(e.id, basket)
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
  );
}
