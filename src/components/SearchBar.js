import React, { memo, useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import '../assets/css/searchBar.min.css';

const SearchBar = memo(() => {
  const [searchEngine, setSearchEngine] = useState('G');

  const onChangeSearchEngine = useCallback(e => {
    e.preventDefault();

    if (searchEngine === 'G') setSearchEngine('N');
    else setSearchEngine('G');
  }, [searchEngine]);

  return (
    <>
      <form method='get' action={searchEngine === 'G' ? 'http://www.google.co.kr/search' : 'http://search.naver.com/search.naver'} target='_blank' className='search_wrapper' >
        <div onClick={onChangeSearchEngine} className={searchEngine === 'G' ? 'gg' : 'nv'}>
          {
            searchEngine && searchEngine === 'G' ? (
              <>G</>
            ) : (
              <>N</>
            )
          }
        </div>
        {
          searchEngine && searchEngine === 'G' ? (
            <input type="text" name='q' />
          ) : (
            <input type="text" name='query' />
          )
        }
        <button>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </form>
    </>
  );
});

export default SearchBar;