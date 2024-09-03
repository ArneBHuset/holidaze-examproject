import RegisterLoginPage from './pages/RegisterLoginPage.tsx';
import MainLayout from './layout/MainLayout.tsx';
import './index.scss';

function App() {
  const apiKey = process.env.REACT_APP_API_KEY;

  if (!apiKey) {
    console.error('API Key is not defined!');
  }

  return (
    <>
      <MainLayout>
        <RegisterLoginPage />
      </MainLayout>
    </>
  );
}

export default App;
