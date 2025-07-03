import React, { useEffect, useState } from 'react';
import api from '../api/http';
import { useT } from '../i18n';

/**
 * Galileo User Help s.63 opisuje potrzebę monitorowania zdarzeń.
 * CM-21 s.78 wskazuje strukturę logów w formacie JSON.
 */

type LogEntry = { czas: string; akcja: string };

const LogPanel: React.FC = () => {
  const { t } = useT();
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const load = async () => {
    try {
      const { data } = await api.get('/log');
      setLogs(data);
    } catch {
      /* ignorujemy błędy */
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <section className="mb-4 p-4 bg-white rounded">
      <h2 className="text-lg font-bold mb-2">{t('log')}</h2>
      <ul className="text-sm max-h-64 overflow-y-auto border p-2">
        {logs.map((l, i) => (
          <li key={i}>{l.czas} – {l.akcja}</li>
        ))}
      </ul>
    </section>
  );
};

export default LogPanel;
