import AuthForm from '../form';
import { signUp } from '@/utils';

export default function SignUpPage() {
  return (
    <AuthForm
      buttonText="Sign Up"
      postMethod={signUp}
      redirectText="Sign In"
      redirectUrl="/auth/signin"
      title="Please enter your details below to sign up"
    />
  );
}
