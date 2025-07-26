import React, { useEffect, useState } from 'react';
import { Card, Spin } from 'antd';

const WeatherWidget = ({ city = 'Valencia' }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Tu endpoint con la API key incrustada (o mejor, muévela a una .env)
  const API_URL = `http://api.weatherapi.com/v1/current.json?key=5abc367f496348bb908142516252607&q=${encodeURIComponent(
    city
  )}&aqi=no`;

  useEffect(() => {
    setLoading(true);
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data.error) throw new Error(data.error.message);
        setWeather(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [API_URL]);

  if (loading) return <Spin />;
  if (error) return <Card size="small">Error: {error}</Card>;

  const { location, current } = weather;
  return (
    <Card size="small" title={`🌤️ ${location.name}`}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <img
          src={current.condition.icon}
          alt={current.condition.text}
          width={48}
          height={48}
        />
        <div>
          <p style={{ margin: 0, fontSize: '1.2em' }}>
            <strong>{Math.round(current.temp_c)}°C</strong>
          </p>
          <p style={{ margin: 0 }}>{current.condition.text}</p>
        </div>
      </div>
      <p style={{ marginTop: 8 }}>Humedad: {current.humidity}%</p>
      <p style={{ margin: 0 }}>Viento: {current.wind_kph} kph</p>
    </Card>
  );
};

export default WeatherWidget;
