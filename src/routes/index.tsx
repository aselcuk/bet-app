import ProtectedRoute from '@/protectedRoute';
import { AuthLayout, MainLayout } from '@/layouts';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import {
  DetailPage,
  HomePage,
  NotFoundPage,
  SignInPage,
  SignUpPage
} from '@/pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/',
        element: <HomePage />,
        index: true
      },
      {
        path: '/detail/:sport/:id',
        element: <DetailPage />
      }
    ]
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="signin" replace />
      },
      {
        path: 'signin',
        element: <SignInPage />
      },
      {
        path: 'signup',
        element: <SignUpPage />
      }
    ]
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
]);
