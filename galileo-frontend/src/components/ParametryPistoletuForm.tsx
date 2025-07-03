import React, { useEffect, useState } from 'react';
import api from '../api/http';
import { useT } from '../i18n';

/**
 * CM-21 s.42 określa maksymalne napięcie i przepływ.
 * Galileo User Help s.57 zaleca kontrolę parametrów przed strzałem.
 */

interface Params {
  napiecie_kv: number;
  prad_ua: number;
  przeplyw_kg_min: number;
}

const init: Params = { napiecie_kv: 0, prad_ua: 0, przeplyw_kg_min: 0 };

const ParametryPistoletuForm: React.FC = () => {
  const { t } = useT();
  const [form, setForm] = useState(init);
  const [msg, setMsg] = useState('');

  const load = async () => {
    try {
      const { data } = await api.get('/params');
      setForm(data);
    } catch {
      /* brak wstępnych danych */
    }
  };
  useEffect(() => { load(); }, []);

  const update = (field: keyof Params) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [field]: Number(e.target.value) });

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/params', form);
      setMsg('OK');
      setTimeout(() => setMsg(''), 2000);
    } catch {
      setMsg(t('fetchError'));
    }
  };

  return (
    <section className="mb-4 p-4 bg-white rounded">
      <h2 className="text-lg font-bold mb-2">{t('parameters')}</h2>
      <form onSubmit={send} className="flex flex-col gap-2">
        <label>
          {t('voltage')}
          <input type="number" min={0} max={100} value={form.napiecie_kv} onChange={update('napiecie_kv')} className="border p-1" />
        </label>
        <label>
          {t('current')}
          <input type="number" min={0} max={500} value={form.prad_ua} onChange={update('prad_ua')} className="border p-1" />
        </label>
        <label>
          {t('flow')}
          <input type="number" min={0} max={10} step={0.1} value={form.przeplyw_kg_min} onChange={update('przeplyw_kg_min')} className="border p-1" />
        </label>
        <button className="bg-green-600 text-white px-4 py-2 rounded" type="submit">{t('save')}</button>
        {msg && <span>{msg}</span>}
      </form>
    </section>
  );
};

export default ParametryPistoletuForm;
