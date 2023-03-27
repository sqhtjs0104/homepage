import React, { memo } from 'react';

import Weather from './components/Weather';
import Center from './components/Center';

const App = memo(() => {
  return (
    <>
      <Weather />
      <Center />
    </>
  );
});

export default App;