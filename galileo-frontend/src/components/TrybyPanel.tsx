import React, { useEffect, useState } from 'react';
import api from '../api/http';
import { useT } from '../i18n';

/**
 * CM-21 s.15 opisuje przełączanie między trybami automatycznym i ręcznym.
 * Galileo User Help s.44 podkreśla znaczenie czytelnego wyboru trybu.
 */

type Mode = 'auto' | 'manual' | 'cleaning' | 'dual';

const TrybyPanel: React.FC = () => {
  const { t } = useT();
  const [current, setCurrent] = useState<Mode>('manual');
  const [err, setErr] = useState('');

  const load = async () => {
    try {
      const { data } = await api.get('/mode');
      setCurrent(data.current);
    } catch {
      setErr(t('fetchError'));
    }
  };

  useEffect(() => { load(); }, []);

  const change = async (mode: Mode) => {
    try {
      await api.post('/mode', { mode });
      setCurrent(mode);
    } catch {
      setErr(t('fetchError'));
    }
  };

  const modes: Mode[] = ['auto', 'manual', 'cleaning', 'dual'];

  return (
    <section className="mb-4 p-4 bg-white rounded">
      <h2 className="text-lg font-bold mb-2">{t('mode')}</h2>
      <div className="flex gap-2 flex-wrap">
        {modes.map(m => (
          <button
            key={m}
            className={`px-4 py-2 rounded ${current===m?'bg-blue-600 text-white':'bg-gray-300'}`}
            onClick={() => change(m)}
          >
            {t(m)}
          </button>
        ))}
      </div>
      {err && <p className="text-red-600 mt-2">{err}</p>}
    </section>
  );
};

export default TrybyPanel;
