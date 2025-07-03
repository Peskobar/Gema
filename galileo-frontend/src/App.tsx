import React, { useState } from 'react';
import TrybyPanel from './components/TrybyPanel';
import ParametryPistoletuForm from './components/ParametryPistoletuForm';
import LogPanel from './components/LogPanel';
import { useT } from './i18n';

/**
 * Galileo User Help s.9 opisuje główny ekran panelu operatora.
 */

type Screen = 'main' | 'log';

const App: React.FC = () => {
  const { t, setLang } = useT();
  const [screen, setScreen] = useState<Screen>('main');

  return (
    <div className="max-w-xl mx-auto p-4">
      <header className="mb-4 text-center">
        <h1 className="text-2xl font-bold">{t('panelTitle')}</h1>
        <select onChange={e => setLang(e.target.value)} className="ml-2 border p-1">
          <option value="pl">PL</option>
          <option value="en">EN</option>
        </select>
        <nav className="mt-2">
          <button onClick={() => setScreen('main')} className="mr-2 underline">Główna</button>
          <button onClick={() => setScreen('log')} className="underline">{t('log')}</button>
        </nav>
      </header>

      {screen==='main' && (
        <>
          <TrybyPanel />
          <ParametryPistoletuForm />
        </>
      )}
      {screen==='log' && <LogPanel />}

      <footer className="text-center mt-4 text-sm">{t('header')}</footer>
    </div>
  );
};

export default App;
