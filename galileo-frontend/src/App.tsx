import React, { useState } from 'react';
import ModeButtons from './components/ModeButtons';
import GunSettingsForm from './components/GunSettingsForm';
import CleaningScreen from './components/CleaningScreen';
import DualStationView from './components/DualStationView';

type Screen = 'main' | 'cleaning' | 'dual';

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('main');

  return (
    <div className="container">
      <header>
        <h1>Galileo – panel operatorski</h1>
      </header>

      {screen === 'main' && (
        <>
          <ModeButtons />
          <GunSettingsForm />
        </>
      )}
      {screen === 'cleaning' && <CleaningScreen />}
      {screen === 'dual' && <DualStationView />}

      <footer>
        <button onClick={() => setScreen('main')}>Ekran główny</button>
        <button onClick={() => setScreen('cleaning')}>Czyszczenie</button>
        <button onClick={() => setScreen('dual')}>Dual station</button>
      </footer>
    </div>
  );
};

export default App;
