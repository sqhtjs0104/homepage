import React, { memo } from 'react';

import Clock from './components/Clock';
import Weather from './components/Weather';

const App = memo(() => {
  return (
    <>
      <Clock />
      <Weather />
    </>
  );
});

export default App;