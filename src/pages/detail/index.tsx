import EventDetailHeader from './header';
import { getEventOdds } from '@/services';
import EventDetailMarkets from './markets';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { EventDetailItem } from '@/model';
import { Box, EmptyData, FlexBox } from '@/components';
import './styles.scss';

export default function DetailPage() {
  const { id, sport } = useParams();

  const [eventDetail, setEventDetail] = useState<EventDetailItem>();

  useEffect(() => {
    if (id && sport) {
      getEventOdds(id, sport).then((res: EventDetailItem) => {
        setEventDetail(res);
      });
    }
  }, [id, sport]);

  if (!eventDetail) {
    return <EmptyData>Odds for this event are not available yet.</EmptyData>;
  }

  return (
    <FlexBox className="detail-page" direction="column" gap="var(--spacing-16)">
      <Box>
        <EventDetailHeader event={eventDetail} />
      </Box>

      <Box>
        <EventDetailMarkets event={eventDetail} />
      </Box>
    </FlexBox>
  );
}
