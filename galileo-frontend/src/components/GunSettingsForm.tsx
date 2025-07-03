import React, { useEffect, useState } from 'react';
import api from '../api/http';

interface GunParams {
  napiecie_kV: number;
  prad_uA: number;
  przeplyw_Nm3h: number;
  puder_proc: number;
}

const initData: GunParams = {
  napiecie_kV: 0,
  prad_uA: 0,
  przeplyw_Nm3h: 0,
  puder_proc: 0
};

const GunSettingsForm: React.FC = () => {
  const [form, setForm] = useState<GunParams>(initData);
  const [msg, setMsg] = useState('');

  const loadParams = async () => {
    try {
      const { data } = await api.get<GunParams>('/parameters');
      setForm(data);
    } catch {
      /* ignorujemy brak danych początkowych */
    }
  };

  useEffect(() => {
    loadParams();
  }, []);

  const handleChange =
    (field: keyof GunParams) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [field]: Number(e.target.value) });
    };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/parameters', form);
      setMsg('Zapisano ustawienia');
      setTimeout(() => setMsg(''), 2000);
    } catch {
      setMsg('Błąd zapisu');
    }
  };

  return (
    <section>
      <h2>Ustawienia pistoletu</h2>
      <form onSubmit={submit} className="form">
        <label>
          Napięcie [kV]
          <input
            type="number"
            min={0}
            max={100}
            value={form.napiecie_kV}
            onChange={handleChange('napiecie_kV')}
          />
        </label>

        <label>
          Prąd [µA]
          <input
            type="number"
            min={0}
            max={200}
            value={form.prad_uA}
            onChange={handleChange('prad_uA')}
          />
        </label>

        <label>
          Przepływ [Nm³/h]
          <input
            type="number"
            step={0.1}
            min={0}
            max={10}
            value={form.przeplyw_Nm3h}
            onChange={handleChange('przeplyw_Nm3h')}
          />
        </label>

        <label>
          Procent pudru [%]
          <input
            type="number"
            min={0}
            max={100}
            value={form.puder_proc}
            onChange={handleChange('puder_proc')}
          />
        </label>

        <button type="submit" className="btn save">
          Zapisz
        </button>
        {msg && <span className="msg">{msg}</span>}
      </form>
    </section>
  );
};

export default GunSettingsForm;
