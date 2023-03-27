import React, { memo, useEffect, useState } from 'react';

import background from '../assets/js/Images';

import '../assets/css/background.min.css';

const Background = memo(() => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!background) return;
    const maxLength = background.length;
    const randomIndex = Math.floor(Math.random() * (maxLength));
    // const randomIndex = maxLength - 1;
    setData(background[randomIndex]);
  }, []);

  return (
    data && <>
      <div className='wall' style={{background: `url(${data.image}) center / cover no-repeat`}}>
      </div>
      <div className='lines_wrapper'>
        <div className='lines'>
          <p className='quotes'>"{data.quotes}"</p>
          <p className='translate'>"{data.traslate}"</p>  
        </div>
      </div>
    </>
  );
});

export default Background;