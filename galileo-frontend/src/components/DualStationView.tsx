import React, { useEffect, useState } from 'react';
import api from '../api/http';

interface Params {
  napiecie_kV: number;
  prad_uA: number;
  przeplyw_Nm3h: number;
  puder_proc: number;
}

const DualStationView: React.FC = () => {
  const [left, setLeft] = useState<Params>();
  const [right, setRight] = useState<Params>();

  /* przykładowo pobieramy te same parametry dwukrotnie
     – w prawdziwym urządzeniu byłyby oddzielne stacje */
  const load = async () => {
    const { data } = await api.get<Params>('/parameters');
    setLeft(data);
    setRight(data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <section>
      <h2>Dual station</h2>
      <div className="dual">
        <div>
          <h3>Stacja 1</h3>
          {left ? (
            <ul>
              <li>Napięcie: {left.napiecie_kV} kV</li>
              <li>Prąd: {left.prad_uA} µA</li>
              <li>Przepływ: {left.przeplyw_Nm3h} Nm³/h</li>
              <li>Puder: {left.puder_proc}%</li>
            </ul>
          ) : (
            '---'
          )}
        </div>
        <div>
          <h3>Stacja 2</h3>
          {right ? (
            <ul>
              <li>Napięcie: {right.napiecie_kV} kV</li>
              <li>Prąd: {right.prad_uA} µA</li>
              <li>Przepływ: {right.przeplyw_Nm3h} Nm³/h</li>
              <li>Puder: {right.puder_proc}%</li>
            </ul>
          ) : (
            '---'
          )}
        </div>
      </div>
    </section>
  );
};

export default DualStationView;
