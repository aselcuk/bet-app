import { Link } from 'react-router-dom';
import { FlexBox, Typography } from '@/components';
import './styles.scss';

export default function NotFoundPage() {
  return (
    <FlexBox
      gap="var(--spacing-16)"
      direction="column"
      alignItems="center"
      justifyContent="center"
      className="not-found-page"
    >
      <Typography variant="heading1" color="black">
        404
      </Typography>
      <Typography>Oops! The page you're looking for doesn't exist.</Typography>
      <Link to="/">
        <Typography variant="subtitle2" color="primary">
          Go back home
        </Typography>
      </Link>
    </FlexBox>
  );
}
