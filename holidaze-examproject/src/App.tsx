import RegisterLoginPage from './pages/RegisterLoginPage.tsx';
import MainLayout from './layout/MainLayout.tsx';
import './index.scss';

function App() {
  return (
    <>
      <MainLayout>
        <RegisterLoginPage />
      </MainLayout>
    </>
  );
}

export default App;
