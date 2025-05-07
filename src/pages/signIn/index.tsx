import { useState } from 'react';
import { signIn } from '@/utils';
import { loginSchema } from '@/utils/schema';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, type FieldValues } from 'react-hook-form';
import { Box, Button, FlexBox, Input, Typography } from '@/components';
import './styles.scss';

export default function SignIn() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<FieldValues>({
    resolver: yupResolver(loginSchema()),
    defaultValues: {
      email: '',
      password: ''
    },
    shouldFocusError: false
  });

  const onSubmit = (formData: any) => {
    setLoading(true);

    const { email, password } = formData;

    signIn(email, password)
      .then(() => navigate('/'))
      .finally(() => setLoading(false));
  };

  return (
    <Box className="sign-in-page">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FlexBox direction="column" gap="var(--spacing-24)">
          <Box>
            <Typography align="center" variant="body2">
              Please enter your details below to sign in
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

                {errors.email && (
                  <Typography variant="caption" color="error">
                    <>{errors.email.message}</>
                  </Typography>
                )}
              </Box>

              <Box>
                <Input
                  fullWidth
                  error={!!errors.password}
                  placeholder="Password"
                  {...register('password')}
                />

                {errors.password && (
                  <Typography variant="caption" color="error">
                    <>{errors.password.message}</>
                  </Typography>
                )}
              </Box>
            </FlexBox>
          </Box>

          <Box>
            <Button fullWidth disabled={loading} type="submit">
              <Typography variant="subtitle2" color="white" weight={600}>
                Sign In
              </Typography>
            </Button>
          </Box>

          <Box>
            <Typography variant="body2" align="center">
              OR
            </Typography>
          </Box>

          <Box>
            <Link to="/auth/signup">
              <Typography
                variant="body2"
                align="center"
                weight={500}
                color="primary"
              >
                Sign Up
              </Typography>
            </Link>
          </Box>
        </FlexBox>
      </form>
    </Box>
  );
}
