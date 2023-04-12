import React, { memo, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';

import { useSelector, useDispatch } from 'react-redux';
import { getCurrentData } from '../assets/slices/ScheduleSlice';

const Table = styled.table`
  --standard: 100px;
  
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: #FAF8F1;
  table-layout: fixed;
  padding: calc(var(--standard) / 100 * 10) calc(var(--standard) / 100 * 10);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;

  @media screen and (max-width: 450px) {
    border-collapse: collapse;
  }

  th {
    background-color: #F0A04B;
    padding: calc(var(--standard) / 100 * 2) calc(var(--standard) / 100 * 5);
    border-bottom: calc(var(--standard) / 100 * 5) solid #FAF8F1;
    border-radius: calc(var(--standard) / 100 * 10);
    font-size: calc(var(--standard) / 100 * 13);
    text-align: left;
    height: 10%;

    @media screen and (max-width: 450px) {
      border-radius: 0
    }
  }

  td {
    font-size: calc(var(--standard) / 100 * 15);
    border: 1px solid #aaa;
    border-radius: 10px;
    background-color: #FAF8F1;
    word-break: break-all;
    height: ${props => 100 / props.weekCount}%;
    box-sizing: border-box;

    .td__div {
      height: 100%;
      max-height: ${props => props.heightUnit}px;
      overflow: hidden;
      box-sizing: border-box;
      position: relative;

      @media screen and (max-width: 450px) {
        border: 3px solid #f7f3ec;
      }

      &.sat { color: #3850d8; }
      &.sun { color: #d33838; }
      &.outer { opacity: 0.4; }

      &:hover {
        cursor: pointer;
        scale: 1.03;
        background-color: #f7f3ec;
      }

      .td__date {
        margin: 0;
        padding: calc(var(--standard) / 100 * 6);
        font-size: calc(var(--standard) / 100 * 14);
      }

      .td__list {
        width: 100%;
        font-size: calc(var(--standard) / 100 * 10);
        margin-bottom: calc(var(--standard) / 100 * 2);
        text-align: right;
        padding-right: calc(var(--standard) / 100 * 5);
        box-sizing: border-box;
        text-overflow: ellipsis;
        position: absolute;
      }
    }
  }
`;

const CalTable = memo(({nowTime, setIsSidebarOpen, setCurrentSidebarTarget}) => {
  const { data, loading, error } = useSelector(state => state.ScheduleSlice);
  const dispatch = useDispatch();

  const [weekCount, setWeekCount] = useState(null);
  const [heightUnit, setHeightUnit] = useState(null);

  const openSidebar = useCallback(e => {
    e.preventDefault();
    setCurrentSidebarTarget(state => {
      return dayjs(e.currentTarget.getAttribute('id').substring(2));
    });
    setIsSidebarOpen(true);
  }, [setCurrentSidebarTarget, setIsSidebarOpen]);

  const makeDayTd = useCallback((index, isOuter, value) => {
    const newTd = document.createElement('td');    
    const newDiv = document.createElement('div');

    const targetDate = nowTime.add(index, 'M').date(value);

    newDiv.setAttribute('id', `td${targetDate.format('YYYY-MM-DD')}`);
    newDiv.classList.add('td__div');
    newDiv.addEventListener('click', openSidebar);

    if (newDiv.dataset.day % 7 === 6) {
      newDiv.classList.add('sat');
    } else if (newDiv.dataset.day % 7 === 0) {
      newDiv.classList.add('sun');
    }

    if (isOuter) newDiv.classList.add('outer');

    const dateValue = document.createElement('div');
    dateValue.classList.add('td__date');
    dateValue.innerHTML = value;
    newDiv.appendChild(dateValue);
    newTd.appendChild(newDiv);

    return newTd;
  }, [nowTime, openSidebar]);

  const renderCalendar = useCallback(isSixWeek =>{
    const firstDay = nowTime.date(1).get('d');
    const dayInfo = {
      startDate: nowTime.subtract(1, 'month').endOf('month').get('D') - (firstDay == 0 ? 7 : firstDay) + 2,
      startDay: firstDay == 0 ? 7 : firstDay,
      endDate: nowTime.endOf('month').get('D'),
    };

		for (let i = 0; i < (isSixWeek ? 42 : 35); i++) {
      const parent = document.querySelector(`.tr${parseInt(i / 7 + 1)}`);
			if (i < dayInfo.startDay - 1) { // 아직 이번달 시작 안함
        parent.appendChild(makeDayTd(-1, true, dayInfo.startDate + i));
			} else if (i > dayInfo.endDate + dayInfo.startDay - 2) { // 이번달 끝남
        parent.appendChild(makeDayTd(1, true, i - dayInfo.endDate - dayInfo.startDay + 2));
			} else { // 이게 이번달 날자들
        parent.appendChild(makeDayTd(0, false, i + 2 - dayInfo.startDay));
			}
		};
	});

  const insertSchedule = useCallback(item => {
    const start = dayjs(`${item.yearMonth}-${item.date}`);
    const end = item.endTime ? dayjs(item.endTime.split(' ')[0]) : dayjs(start);
    const during = Math.ceil(end.diff(start) / 1000 / 60 / 60 / 24);

    let floor = 0;
    const targetChilds = Array.from(document.querySelectorAll(`#td${start.format('YYYY-MM-DD')} > div.td__list`));
    for (let i = 0; i < targetChilds.length; i++) {
      if (targetChilds[i].dataset.floor != i) break;
      floor++;
    }

    for (let i = 0; i <= during; i++) {
      if (start.add(i, 'd').isBefore(end.add(1, 'd'))) {
        const target = document.querySelector(`#td${start.add(i, 'd').format('YYYY-MM-DD')}`);

        if (target) {
          const scheduleItem = document.createElement('div');
          scheduleItem.classList.add('td__list');
          scheduleItem.dataset.floor = floor;

          switch (floor % 3) {
            case 0: scheduleItem.style.backgroundColor = 'skyblue'; break;
            case 1: scheduleItem.style.backgroundColor = 'orange'; break;
            case 2: scheduleItem.style.backgroundColor = 'violet'; break;
            default: break;
          }

          scheduleItem.style.top = `${floor * 18 + 31}px`;

          scheduleItem.innerHTML = i > 0 ? '&nbsp;' : item.name;
          target.appendChild(scheduleItem);
        }
      } else break;
    }
  }, [data]);

  const onResize = useCallback(() => {
    const tbody = document.querySelector('tbody');
    if (!tbody || !nowTime) return;
    const isSix = nowTime.date(1).get('d') == 0 ? true : (
      (nowTime.date(1).get('d') == 6 && nowTime.endOf('M').get('D') == 31) ? true : false
    );
    setWeekCount(isSix ? 6 : 5);
    setHeightUnit(isSix ? tbody.scrollHeight / 6 - 5 : tbody.scrollHeight / 5 - 5);
  }, [nowTime]);

  useEffect(() => {
    if (!nowTime) return;
    window.addEventListener('resize', onResize);
    onResize();
    const isSix = nowTime.date(1).get('d') == 0 ? true : (
      (nowTime.date(1).get('d') == 6 && nowTime.endOf('M').get('D') == 31) ? true : false
    );
    renderCalendar(isSix);
  }, [nowTime]);

  useEffect(() => {
    if (!data) {
      dispatch(getCurrentData());
      return;
    };

    data.forEach(v => {
      if (!v) return;
      insertSchedule(v);
    });
  }, [data]);

  return (
    <Table weekCount={weekCount} heightUnit={heightUnit}>
      <thead>
        <tr>
          <th>MON</th>
          <th>TUE</th>
          <th>WED</th>
          <th>THU</th>
          <th>FRI</th>
          <th>SAR</th>
          <th>SUN</th>
        </tr>
      </thead>
      <tbody>
        <tr className="tr1" />
        <tr className="tr2" />
        <tr className="tr3" />
        <tr className="tr4" />
        <tr className="tr5" />
        <tr className="tr6" />
      </tbody>
    </Table>
  );
});

export default CalTable;