import { formatMatchDate } from '@/utils';
import type { EventDetailItem } from '@/model';
import { useNavigate } from 'react-router-dom';
import { Box, FlexBox, Typography } from '@/components';

type HeaderProps = {
  event: EventDetailItem;
};

export default function EventDetailHeader(props: HeaderProps) {
  const { event } = props;

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <FlexBox
      alignItems="center"
      justifyContent="center"
      direction="column"
      gap="var(--spacing-8)"
      className="detail-page-event"
    >
      <Box>
        <Typography variant="body2">{event.sport_title}</Typography>
      </Box>

      <Box>
        <Typography color="black" variant="subtitle1">
          {event.home_team} - {event.away_team}
        </Typography>
      </Box>

      <Box>
        <Typography variant="caption">
          {formatMatchDate(event.commence_time)}
        </Typography>
      </Box>

      <Box className="detail-page-back" onClick={handleGoBack}>
        <Typography variant="subtitle1">←</Typography>
      </Box>
    </FlexBox>
  );
}
