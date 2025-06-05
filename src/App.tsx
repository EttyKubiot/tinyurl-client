import './App.css';
import ClicksByTargetChart from './ClicksByTargetChart';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Link {
  _id: string;
  originalUrl: string;
}

function App() {
  const [links, setLinks] = useState<Link[]>([]);

  useEffect(() => {
    axios.get<Link[]>('http://localhost:3000/api/links')
      .then((res) => setLinks(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{
      direction: 'rtl',
      padding: '3rem',
      background: 'linear-gradient(to left, #f0f4ff, #ffffff)',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ fontSize: '3rem', color: '#223', textAlign: 'center', marginBottom: '3rem' }}>
        גרפים לכל הלינקים
      </h1>

      {links.map(link => (
        <div key={link._id} style={{
          background: '#fff',
          borderRadius: '12px',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
          maxWidth: '900px',
          marginInline: 'auto'
        }}>
          <h3 style={{
            textAlign: 'center',
            fontSize: '1.2rem',
            color: '#006'
          }}>
            <a href={link.originalUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#006' }}>
              {link.originalUrl}
            </a>
          </h3>
          <ClicksByTargetChart linkId={link._id} />
        </div>
      ))}
    </div>
  );
}

export default App;
