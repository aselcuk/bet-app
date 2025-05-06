import { Box } from './components';
import { store } from './redux/store';
import { MainLayout } from './layouts';
import { Provider } from 'react-redux';
import { DetailPage, HomePage, NotFoundPage } from './pages';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './styles/index.scss';
import './app.scss';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          path: '/',
          element: <HomePage />,
          index: true
        },
        {
          path: '/detail/:sport/:id',
          element: <DetailPage />
        },
        {
          path: '*',
          element: <NotFoundPage />
        }
      ]
    }
  ]);

  return (
    <Box className="app">
      <Box className="app-container">
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </Box>
    </Box>
  );
}

export default App;
