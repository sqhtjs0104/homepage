import React, { memo } from 'react';

import Clock from './Clock';
import SearchBar from './SearchBar';

import '../assets/css/center.min.css'

const Center = memo(() => {
  return (
    <div className='center_wrapper'>
      <Clock />
      <SearchBar />
    </div>
  );
});

export default Center;