import Landing1 from './pages/landing1';
import ThankYou from './pages/ThankYou';

function App() {
  const path = window.location.pathname.toLowerCase();
  if (
    path === '/thankyou' || 
    path === '/thnakyou' || 
    path === '/thank-you' || 
    path === '/thankyou.html' ||
    path === '/thnakyou.html'
  ) {
    return <ThankYou />;
  }
  return <Landing1 />;
}

export default App;
