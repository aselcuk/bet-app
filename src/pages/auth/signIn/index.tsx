import AuthForm from '../form';
import { signIn } from '@/utils';

export default function SignInPage() {
  return (
    <AuthForm
      buttonText="Sign In"
      postMethod={signIn}
      redirectText="Sign Up"
      redirectUrl="/auth/signup"
      title="Please enter your details below to sign in"
    />
  );
}
