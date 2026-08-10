import Landing1 from './pages/landing1';
import Lp1 from './pages/lp1';
import Lp2 from './pages/lp2';
import ThankYou from './pages/ThankYou';
import Tq1 from './pages/Tq1';
import Tq2 from './pages/Tq2';
import Studio from './pages/Studio';
import Announcement from './pages/Announcement';

function App() {
  const host = window.location.hostname.toLowerCase();
  const path = window.location.pathname.toLowerCase();

  if (path.includes('/announcement') || path.includes('/announcemtn') || host.startsWith('announcement')) {
    return <Announcement />;
  }

  const isStudio = 
    path.includes('/studio') ||
    host.startsWith('studio');

  if (isStudio) {
    return <Studio />;
  }

  const isAffiliate = 
    path.includes('/affiliate') || 
    path.includes('/affilate') ||
    host.startsWith('affiliate') ||
    host.startsWith('affilate');

  if (isAffiliate) {
    return <Affiliate />;
  }

  if (path.includes('/tq2')) {
    return <Tq2 />;
  }

  if (path.includes('/tq1')) {
    return <Tq1 />;
  }

  const isThankYou = 
    path.includes('thank') || 
    path.includes('thnak') ||
    path.includes('/tq');

  if (isThankYou) {
    return <ThankYou />;
  }

  const isLp2 = host.startsWith('lp2') || path.includes('/lp2') || path.includes('/lp-2');
  if (isLp2) {
    return <Lp2 />;
  }

  const isLp1 = host.startsWith('lp1') || path.includes('/lp1') || path.includes('/lp-1');
  if (isLp1) {
    return <Lp1 />;
  }

  return <Landing1 />;
}

export default App;

