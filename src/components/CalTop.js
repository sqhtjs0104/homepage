import React, { memo, useCallback } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCaretLeft, faSquareCaretRight } from '@fortawesome/free-solid-svg-icons';

const TopDiv = styled.div`
  --standard: 100px;

  width: 100%;
  padding: calc(var(--standard) / 100 * 10);
  background-color: #FAEAB1;
  box-sizing: border-box;
  display: flex;
  flex-flow: row nowrap;
  align-items: end;
  border-bottom: 2px solid #eecb93;
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;

  .top__nowYM {
    width: 100%;
    height: calc(var(--standard) / 100 * 50);
    color: #C58940;
    height: 100%;

    .top__nowYM__info {
      padding: 0 calc(var(--standard) / 100 * 5);
      margin: 0;
      margin-left: calc(var(--standard) / 100 * 20);
      display: inline-block;

      h1, h3 {
        display: inline-block;
        margin: 0 calc(var(--standard) / 100 * 2);
        line-height: 1;
      }

      &:hover {
        color: #E5BA73;
        cursor: pointer;
      }
    }
  }

  button {
    border: none;
    border-radius: calc(var(--standard) / 100 * 10);
    color: #C58940;
    background: none;
    font-size: calc(var(--standard) / 100 * 26);
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    line-height: 1;

    &:hover {
      cursor: pointer;
      scale: 1.1;
    }
  }
`;

const CalTop = memo(({nowTime, setNowTime, setIsYMPickerOpen, cleanElements}) => {
	const toPrev = useCallback(e => {
		e.preventDefault();
		if (!nowTime) return;
    cleanElements();
		setNowTime(state => {
			return state.subtract(1, 'month');
		});
	});

	const toNext = useCallback(e => {
		e.preventDefault();
		if (!nowTime) return;
    cleanElements();
		setNowTime(state => {
			return state.add(1, 'month');
		});
	});

  const onYMPickerOpen = useCallback(e => {
    setIsYMPickerOpen(true);
  });

  return (
    <>
      <TopDiv>
        <button onClick={toPrev}>
            <FontAwesomeIcon icon={faSquareCaretLeft} />
        </button>
        <div className='top__nowYM'>
          <div className='top__nowYM__info' onClick={onYMPickerOpen}>
						<h1><span>{nowTime && nowTime?.month() + 1}</span>월</h1>
						<h3><span>{nowTime && nowTime?.year()}</span>년</h3>
					</div>
        </div>
        <button onClick={toNext}>
            <FontAwesomeIcon icon={faSquareCaretRight} />
        </button>
      </TopDiv>
    </>
  );
});

export default CalTop;