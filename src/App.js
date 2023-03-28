import React, { memo } from 'react';

import Background from './components/Background';
import Weather from './components/Weather';
import Center from './components/Center';
import Sidebar from './components/Sidebar';

const App = memo(() => {
  return (
    <>
      <Background />
      <Weather />
      <Center />
      <Sidebar />
    </>
  );
});

export default App;