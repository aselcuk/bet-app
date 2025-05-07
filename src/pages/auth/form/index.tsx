import { useState } from 'react';
import { schema } from './resolver';
import type { UserCredential } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, type FieldValues } from 'react-hook-form';
import { Box, Button, FlexBox, Input, Typography } from '@/components';
import './styles.scss';

type SignFormProps = {
  title: string;
  buttonText: string;
  redirectUrl: string;
  redirectText: string;
  postMethod(email: string, password: string): Promise<UserCredential>;
};

export default function AuthForm(props: SignFormProps) {
  const { buttonText, redirectText, redirectUrl, title, postMethod } = props;

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<FieldValues>({
    resolver: yupResolver(schema()),
    defaultValues: {
      email: '',
      password: ''
    },
    shouldFocusError: false
  });

  const onSubmit = (formData: any) => {
    setLoading(true);

    const { email, password } = formData;

    postMethod(email, password)
      .then(() => navigate('/'))
      .finally(() => setLoading(false));
  };

  const renderFieldError = (field: string) => {
    if (!errors[field]) {
      return <></>;
    }

    return (
      <Typography variant="caption" color="error">
        <>{errors[field].message}</>
      </Typography>
    );
  };

  return (
    <Box className="auth-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FlexBox direction="column" gap="var(--spacing-24)">
          <Box>
            <Typography align="center" variant="body2">
              {title}
            </Typography>
          </Box>

          <Box>
            <FlexBox direction="column" gap="var(--spacing-8)">
              <Box>
                <Input
                  fullWidth
                  error={!!errors.email}
                  placeholder="Email"
                  {...register('email')}
                />

                {renderFieldError('email')}
              </Box>

              <Box>
                <Input
                  fullWidth
                  error={!!errors.password}
                  placeholder="Password"
                  {...register('password')}
                />

                {renderFieldError('password')}
              </Box>
            </FlexBox>
          </Box>

          <Box>
            <Button fullWidth disabled={loading} type="submit">
              <Typography variant="subtitle2" color="white" weight={600}>
                {buttonText}
              </Typography>
            </Button>
          </Box>

          <Box>
            <Typography variant="body2" align="center">
              OR
            </Typography>
          </Box>

          <Box>
            <Link to={redirectUrl}>
              <Typography
                variant="body2"
                align="center"
                weight={500}
                color="primary"
              >
                {redirectText}
              </Typography>
            </Link>
          </Box>
        </FlexBox>
      </form>
    </Box>
  );
}
