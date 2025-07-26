// NewsWidget.jsx
import React, { useEffect, useState } from 'react';
export default function NewsWidget() {
  const [headlines, setHeadlines] = useState([]);
  useEffect(() => {
    fetch('https://api.noticias.tu/top')
      .then(r => r.json())
      .then(d => setHeadlines(d.slice(0,5)));
  }, []);
  return (
    <ul style={{ padding:'0 1rem' }}>
      {headlines.map((h,i) => <li key={i}>{h.title}</li>)}
    </ul>
  );
}
