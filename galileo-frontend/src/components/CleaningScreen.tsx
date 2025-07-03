import React, { useState } from 'react';
import api from '../api/http';

const CleaningScreen: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'running' | 'done'>('idle');

  const startCleaning = async () => {
    setStatus('running');
    /* symulacja: w realnym urządzeniu byłby osobny endpoint */
    try {
      await api.post('/mode', { mode: 'cleaning' });
      setTimeout(() => setStatus('done'), 3000);
    } catch {
      setStatus('idle');
    }
  };

  return (
    <section>
      <h2>Tryb czyszczenia</h2>
      {status === 'idle' && (
        <button className="btn cleaning" onClick={startCleaning}>
          Rozpocznij czyszczenie
        </button>
      )}
      {status === 'running' && <p>Trwa czyszczenie…</p>}
      {status === 'done' && <p>Zakończono!</p>}
    </section>
  );
};

export default CleaningScreen;
