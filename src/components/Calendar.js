import React, { memo, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';

import CalTop from './CalTop';
import CalTable from './CalTable';
import CalSidebar from './CalSidebar';

import { useSelector, useDispatch } from 'react-redux';
import { getSchedule } from '../assets/slices/ScheduleSlice';

const MainWrap = styled.div`
  --standard: 100px;

  font-family: 'Roboto Mono', monospace;
  width: 1000px;
  max-width: 90vw;
  height: 600px;
  max-height: 90vh;
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  margin: auto;
  border: 1px solid #C58940;
  border-radius: 20px;

  @media screen and (max-width: 1000px) and (min-width: 451px) {
    max-height: none;
  }
  @media screen and (max-width: 450px) {
    max-height: none;
  }
`;

const Overlay = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #00000015;

  visibility: hidden;
  &.active {
    visibility: visible;
  }
`;

const YMPicker = styled.div`
  width: 200px;
  height: 130px;
  z-index: 2;
  background-color: #fff;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #ccc;
  border-radius: 10px;
  display: none;

  &.active {
    display: flex;
  }

  form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;

    input {
      margin-bottom: 20px;
      font-size: 18px;
      padding: 8px 12px;
    }

    div {
      width: 100%;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-evenly;

      button {
        padding: 6px 20px;
        font-size: 16px;
        border: none;
        border-radius: 10px;
        
        color: white;
        font-weight: 600;

        &:hover {
          cursor: pointer;
          scale: 0.9;
        }

        &:first-of-type { background-color: #5656d6; }
        &:last-of-type { background-color: #a59494; }
      }
    }
  }
`

const Calendar = memo(() => {
  const [nowTime, setNowTime] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentSidebarTarget, setCurrentSidebarTarget] = useState(null);
  const [isYMPickerOpen, setIsYMPickerOpen] = useState(false);
  
  const { data, loading, error } = useSelector(state => state.ScheduleSlice);
  const dispatch = useDispatch();

	useEffect(() => {
		setNowTime(new dayjs());
	}, []);

  useEffect(() => {
    if (!nowTime) return;
    dispatch(getSchedule(nowTime));
  }, [nowTime]);

  const onFocusOut = useCallback(e => {
    e.preventDefault();
    setIsSidebarOpen(false);
    setIsYMPickerOpen(false);
  });

  const cleanElements = useCallback(e => {
    const tr = document.querySelectorAll('tbody > tr');
		tr.forEach(v => {
			v.innerHTML = "";
		});
  }, []);

  const onYMPickerSubmit = useCallback(e => {
    e.preventDefault();
    const value = e.currentTarget.yearMonth.value;
    const newMonth = dayjs(value);
    setNowTime(newMonth);
    cleanElements();
    setIsYMPickerOpen(false);
  });

  const onYMPickerClose = useCallback(e => {
    setIsYMPickerOpen(false);
  });

  return (
    <MainWrap>
      <CalTop nowTime={nowTime} setNowTime={setNowTime} setIsYMPickerOpen={setIsYMPickerOpen} cleanElements={cleanElements} />
      <CalTable nowTime={nowTime} setIsSidebarOpen={setIsSidebarOpen} setCurrentSidebarTarget={setCurrentSidebarTarget} />
      <Overlay className={isSidebarOpen || isYMPickerOpen ? "active" : ""} onClick={onFocusOut} />
      <CalSidebar isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} targetDate={currentSidebarTarget} />
      <YMPicker className={isYMPickerOpen ? 'active' : ''}>
        <form onSubmit={onYMPickerSubmit}>
          <input type="month" name='yearMonth' />
          <div>
            <button type='submit'>확인</button>
            <button onClick={onYMPickerClose}>취소</button>
          </div>
        </form>
      </YMPicker>
    </MainWrap>
  );
});

export default Calendar;