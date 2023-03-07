import React, { memo, useCallback } from 'react';
import dayjs from 'dayjs';

import '../assets/css/clock.min.css';

import { useInterval } from '../assets/js/useInterval';

const Clock = memo(() => {
  const setClock = useCallback(() => {
    const target = document.querySelector('.clock');
    target.innerHTML = dayjs().format('hh:mm:ss');
  }, []);

  useInterval(setClock, 1000);

  return (
    <div className='clock_wrapper'>
      <h1 className="clock">{dayjs().format('hh:mm:ss')}</h1>
    </div>
  );
});

export default Clock;