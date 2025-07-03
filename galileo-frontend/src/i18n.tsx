import { createContext, useContext, useState } from 'react';

interface Dict { [key: string]: string }

const pl: Dict = {
  mode: 'Tryb',
  auto: 'Automatyczny',
  manual: 'Manualny',
  cleaning: 'Czyszczenie',
  dual: 'Dualny',
  voltage: 'Napięcie [kV]',
  current: 'Prąd [µA]',
  flow: 'Przepływ [kg/min]',
  save: 'Zapisz',
  log: 'Log zdarzeń'
};

const en: Dict = {
  mode: 'Mode',
  auto: 'Automatic',
  manual: 'Manual',
  cleaning: 'Cleaning',
  dual: 'Dual',
  voltage: 'Voltage [kV]',
  current: 'Current [µA]',
  flow: 'Flow [kg/min]',
  save: 'Save',
  log: 'Event log'
};

const dictionaries = { pl, en };

const I18nContext = createContext({ t: (k: string) => k, setLang: (l: string) => {} });

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<'pl' | 'en'>('pl');
  const value = { t: (k: string) => dictionaries[lang][k] || k, setLang };
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useT = () => useContext(I18nContext);
