import Landing1 from './pages/landing1';
import ThankYou from './pages/ThankYou';

function App() {
  const path = window.location.pathname.toLowerCase();
  const isThankYou = 
    path.includes('thank') || 
    path.includes('thnak');

  if (isThankYou) {
    return <ThankYou />;
  }
  return <Landing1 />;
}

export default App;
