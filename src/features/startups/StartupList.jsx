import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStartups } from './startupSlice';
import StartupCard from './StartupCard';

const StartupList = () => {
  const dispatch = useDispatch();
  const { startups, status, error } = useSelector((state) => state.startups);

  useEffect(() => {
    dispatch(fetchStartups());
  }, [dispatch]);

  if (status === 'loading') return <p>Cargando startups...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <div className="startup-list">
      {startups.map((startup, idx) => (
        <StartupCard
          key={idx}
          name={startup.name}
          img_url={startup.img_url}
          description={startup.description}
          stage={startup.stage}
          contact={startup.email}
        />
      ))}
    </div>
  );
};

export default StartupList;
