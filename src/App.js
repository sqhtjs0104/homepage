import React, { memo } from 'react';

import Background from './components/Background';
import Weather from './components/Weather';
import Center from './components/Center';

const App = memo(() => {
  return (
    <>
      <Background />
      <Weather />
      <Center />
    </>
  );
});

export default App;