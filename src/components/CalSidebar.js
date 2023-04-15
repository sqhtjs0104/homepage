import React, { memo, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faPenToSquare, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

import { useDispatch, useSelector } from 'react-redux';
import { getCurrentData, deleteSchedule, addSchedule, updateSchedule } from '../assets/slices/ScheduleSlice';

const SideMenu = styled.div`
  --standard: 100px;
  @media screen and (max-width: 1000px) and (min-width: 451px) { --standard: 100px; }
  @media screen and (max-width: 450px) { --standard: 100px; }

  width: 25%;
  max-width: 400px;
  min-width: 200px;
  height: 100%;
  max-height: 800px;
  background-color: #fffbf1;
  position: absolute;
  left: 100%;
  top: 0;
  box-sizing: border-box;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border-left: 1px solid #aaa;
  transition: all 0.5s;

  @media screen and (max-width: 1000px) and (min-width: 451px) {
    width: 40%;
    max-height: none;
  }
  @media screen and (max-width: 450px) {
    width: 60%;
    max-height: none;
  }

  visibility: hidden;
  &.active {
    visibility: visible;
    left: 75%;
    @media screen and (max-width: 1000px) and (min-width: 451px) {
      left: 60%;
    }
    @media screen and (max-width: 450px) {
      left: 40%;
    }
  }

  .sideBar__top, .sideBar__top__time {
    display: flex;
    flex-flow: row nowrap;
  }

  .sideBar__top {
    width: 100%;
    height: 8%;
    max-height: 8%;
    padding: calc(var(--standard) / 100 * 10);
    box-sizing: border-box;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;

    button {
      font-size: calc(var(--standard) / 100 * 20);
      margin: 0;
      padding: calc(var(--standard) / 100 * 5);
      border: none;
      border-radius: 5px;
      background: none;

      &:hover {
        cursor: pointer;
      }
    }
  }

  .sideBar__top__time {
    align-items: end;
    h2, h3 {
      margin: 0;
      line-height: 1;
      font-weight: 600;
    }
    h2 {
      font-size: calc(var(--standard) / 100 * 30);
    }
    h3 {
      font-size: calc(var(--standard) / 100 * 22);
    }
    span {
      font-size: calc(var(--standard) / 100 * 16);
      margin-left: calc(var(--standard) / 100 * 2);
      margin-right: calc(var(--standard) / 100 * 5);
    }
  }

  .sidebar__body {
    width: 100%;
    height: 92%;
    box-sizing: border-box;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
  }
  .sideBar__list {
    width: 100%;
    height: calc(var(--standard) * 5);
    box-sizing: border-box;
    list-style: none;
    margin: 0;
    padding: calc(var(--standard) / 100 * 15);
    overflow-y: scroll;

    ::-webkit-scrollbar {
      width: calc(var(--standard) / 100 * 10);
    }
    ::-webkit-scrollbar-thumb {
      background-color: #a5a5a5;
      background-clip: padding-box;
      border: calc(var(--standard) / 100 * 3) solid #ffffff00;
      border-radius: calc(var(--standard) / 100 * 30);
    }
    ::-webkit-scrollbar-track {
      background-color: none;
    }

    li, .updateSchedule {
      margin-bottom: calc(var(--standard) / 100 * 10);
      padding: calc(var(--standard) / 100 * 5);
      border: 1px solid #ddd;
      background-color: #fff;
      border-radius: calc(var(--standard) / 100 * 5);

      .scheduleList__top {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        margin-bottom: calc(var(--standard) / 100 * 10);

        h4 {
          padding: 0;
          margin: 0;
          margin-bottom: calc(var(--standard) / 100 * 2);
          font-size: calc(var(--standard) / 100 * 16);
        }

        button {
          border: none;
          background: none;
          font-size: calc(var(--standard) / 100 * 14);

          &:hover {
            cursor: pointer;
          }
        }
      }

      p {
        margin: 0;
        text-align: right;
        font-size: calc(var(--standard) / 100 * 12);

        span {
          margin-left: calc(var(--standard) / 100 * 10);
          color: #666;
        }
      }

      input {
        padding: 0;
        margin: 0;
        font-size: calc(var(--standard) / 100 * 12);

        &[type='datetime-local'] {
          width: 40%;
          margin-top: calc(var(--standard) / 100 * 5);
        }
      }
    }
  }

  .newSchedule {
    width: 100%;
    padding: calc(var(--standard) / 100 * 15);
    border-top: 1px solid #ddd;
    box-sizing: border-box;

    label {
      font-size: calc(var(--standard) / 100 * 14);
      display: block;
      margin-bottom: calc(var(--standard) / 100 * 3);
    }

    input {
      box-sizing: border-box;
      border: calc(var(--standard) / 100 * 1) solid #aaa;
      border-radius: calc(var(--standard) / 100 * 5);
      background: #fff;
      padding: calc(var(--standard) / 100 * 4);
      font-size: calc(var(--standard) / 100 * 14);
      width: 100%;
      margin-bottom: calc(var(--standard) / 100 * 5);

      &:last-of-type {
        margin-bottom: calc(var(--standard) / 100 * 15);
      }
    }
    
    button {
      width: 100%;
      font-size: calc(var(--standard) / 100 * 20);
      font-weight: 700;
      background-color: #88a7d4;
      padding: calc(var(--standard) / 100 * 5);
      border: none;
      border-radius: calc(var(--standard) / 100 * 5);
      color: white;

      &:hover {
        cursor: pointer;
        background-color: #5151d8;
      }
    }
  }
`;

const CalSidebar = memo(({isOpen, setIsSidebarOpen, targetDate}) => {
  const { data, loading, error } = useSelector(state => state.ScheduleSlice);
  const dispatch = useDispatch();

  const [currentSchedule, setCurrentSchedule] = useState(null);
  const [updateTarget, setUpdateTarget] = useState(null);

  useEffect(() => {
    if (!data) {
      dispatch(getCurrentData());
      return;
    }
  }, [data]);

  useEffect(() => {
    if (!targetDate) return;
    const temp = data.filter(v => {
      if (v.endTime) {
        if (targetDate.isAfter(dayjs(`${v.yearMonth}-${v.date}`).subtract(1, 'd')) && targetDate.isBefore(dayjs(`${v.endTime.split(' ')[0]}`).add(1, 'd'))) {
          return true;
        }
      } else {
        if (targetDate.format('YYYY-MM-DD') == `${v.yearMonth}-${v.date}`) {
          return true;
        }
      }
      return false;
    });
    setCurrentSchedule(temp);
  }, [targetDate, data]);

  const onCloseButtonClick = useCallback(e => {
    e.preventDefault();
    setIsSidebarOpen(false);
  }, [setIsSidebarOpen]);

  const deleteAllTdList = useCallback(e => {
    const targets = document.querySelectorAll('.td__list');
    targets.forEach(v => {
      v.remove();
    });
  });
  
  const deleteScheduleList = useCallback(e => {
    e.preventDefault();
    
    if (window.confirm('스케줄을 삭제하시겠습니까?')) {
      deleteAllTdList();
      const targetId = e.currentTarget.closest('li').getAttribute('id');
      dispatch(deleteSchedule(targetId));
    } else {
      return;
    }
  });

  const addScheduleList = useCallback(e => {
    e.preventDefault();

    const current = e.currentTarget;
    
    const temp = {
      name: current.title.value,
      place: current.place.value ? current.place.value : null,
      yearMonth: targetDate.format('YYYY-MM'),
      date: targetDate.format('DD'),
      time: current.time.value ? current.time.value : null,
      endTime: current.endTime.value ? `${current.endTime.value.split('T')[0]} ${current.endTime.value.split('T')[1]}` : null
    };

    if (!temp.name) {
      window.alert('일정 이름을 입력하세요.');
      return;
    }

    deleteAllTdList();
    dispatch(addSchedule(temp));

    current.title.value = null;
    current.place.value = null;
    current.time.value = null;
    current.endTime.value = null;
  });

  const onUpdateScheduleClick = useCallback(e => {
    e.preventDefault();
    const targetId = e.currentTarget.closest('li').getAttribute('id');
    setUpdateTarget(targetId);
  });

  const onUpdateCancleClick = useCallback(e => {
    e.preventDefault();
    setUpdateTarget(null);
  });

  const updateScheduleItem = useCallback(e => {
    e.preventDefault();

    const current = e.currentTarget;
    const targetId = current.getAttribute('id');
    
    const temp = {
      name: current.title.value,
      place: current.place.value ? current.place.value : null,
      yearMonth: current.startTime.value ? `${current.startTime.value.split('-')[0]}-${current.startTime.value.split('-')[1]}` : targetDate.format('YYYY-MM'),
      date: current.startTime.value ? `${current.startTime.value.split('-')[2].split('T')[0]}` : targetDate.format('DD'),
      time: current.startTime.value ? `${current.startTime.value.split('T')[1]}` : null,
      endTime: current.endTime.value ? `${current.endTime.value.split('T')[0]} ${current.endTime.value.split('T')[1]}` : null
    };

    if (!temp.name) {
      window.alert('일정 이름을 입력하세요.');
      return;
    }

    deleteAllTdList();
    dispatch(updateSchedule({
      id: targetId,
      data: temp
    }));
    setUpdateTarget(null);
  });

  useEffect(() => {
    const current = document.querySelector('.newSchedule');
    current.title.value = null;
    current.place.value = null;
    current.time.value = null;
    current.endTime.value = null;
  }, [targetDate]);

  return (
    <SideMenu className={isOpen ? "active" : ""}>
      <div className='sideBar__top'>
        <div className='sideBar__top__time'>
          <h2>{targetDate && targetDate.format('DD')}</h2>
          <span>일</span>
          <h3>
            {
              targetDate && (
                targetDate.day() === 0 ? '일' :
                targetDate.day() === 1 ? '월' :
                targetDate.day() === 2 ? '화' :
                targetDate.day() === 3 ? '수' :
                targetDate.day() === 4 ? '목' :
                targetDate.day() === 5 ? '금' :
                targetDate.day() === 6 ? '토' : '??'
              )
            }
          </h3>
          <span>요일</span>
        </div>
        <button onClick={onCloseButtonClick}><FontAwesomeIcon icon={faXmark} /></button>
      </div>

      <div className="sidebar__body">
      <ul className='sideBar__list'>
        {
          currentSchedule && currentSchedule.map((v, i) => {
            return (
              v.id !== updateTarget ? (
                <li key={i} id={v.id}>
                  <div className='scheduleList__top'>
                    <h4>{v?.name}</h4>
                    <div>
                      <button title='수정하기' onClick={onUpdateScheduleClick}><FontAwesomeIcon icon={faPenToSquare} /></button>
                      <button title='삭제하기' onClick={deleteScheduleList}><FontAwesomeIcon icon={faXmark} /></button>
                    </div>
                  </div>
                  <p>
                    <span>{v?.place}</span>
                    <span>{v?.yearMonth}-{v?.date} {v?.time}</span>
                    {
                      v?.endTime ? (
                        <span>~ {v.endTime}</span>
                      ) : <></>
                    }
                  </p>
                </li>
              ) : (
                <form className="updateSchedule" onSubmit={updateScheduleItem} id={v.id} key={i}>
                  <div className='scheduleList__top'>
                    <input type='text' name='title' defaultValue={v?.name} />
                    <div>
                      <button title='저장하기' type='submit'><FontAwesomeIcon icon={faFloppyDisk} /></button>
                      <button title='취소하기' onClick={onUpdateCancleClick}><FontAwesomeIcon icon={faXmark} /></button>
                    </div>
                  </div>
                  <p>
                    <input type='text' name='place' defaultValue={v?.place} />
                    <input type="datetime-local" name='startTime' defaultValue={`${v?.yearMonth}-${v?.date}T${v?.time}`} /> ~ <input type="datetime-local" name='endTime' defaultValue={`${v?.endTime?.split(' ')[0]}T${v?.endTime?.split(' ')[1]}`} />
                  </p>
                </form>
              )
            )
          })
        }
      </ul>

      <form className="newSchedule" onSubmit={addScheduleList}>
        <label htmlFor="title">이름</label><input type="text" placeholder="스케줄명" name='title' id='title' />
        <label htmlFor="place">장소</label><input type="text" placeholder="장소" name='place' id='place' />
        <label htmlFor="time">시간</label><input type="time" name='startTime' id='time' />
        <label htmlFor="endTime">종료일시</label><input type="datetime-local" name='endTime' id='endTime' />
        <button type='submit'>일정 추가</button>
      </form>
      </div>
    </SideMenu>
  );
});

export default CalSidebar;