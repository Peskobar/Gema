import React, { useEffect, useState } from 'react';
import api from '../api/http';

type Mode = 'auto' | 'manual' | 'cleaning' | 'dual';

const modes: Mode[] = ['auto', 'manual', 'cleaning', 'dual'];

const ModeButtons: React.FC = () => {
  const [current, setCurrent] = useState<Mode>('manual');
  const [error, setError] = useState('');

  const loadMode = async () => {
    try {
      const { data } = await api.get('/mode');
      setCurrent(data.current as Mode);
    } catch {
      setError('Błąd pobierania aktualnego trybu');
    }
  };

  useEffect(() => {
    loadMode();
  }, []);

  const changeMode = async (mode: Mode) => {
    try {
      await api.post('/mode', { mode });
      setCurrent(mode);
    } catch {
      setError('Nie udało się zmienić trybu');
    }
  };

  return (
    <section>
      <h2>Tryby pracy</h2>
      <div className="btn-row">
        {modes.map((m) => (
          <button
            key={m}
            className={current === m ? 'btn active' : 'btn'}
            onClick={() => changeMode(m)}
          >
            {m.toUpperCase()}
          </button>
        ))}
      </div>
      {error && <p className="error">{error}</p>}
    </section>
  );
};

export default ModeButtons;
