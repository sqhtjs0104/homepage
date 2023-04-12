import React, { memo, useState, useCallback } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCheck, faCalendar } from '@fortawesome/free-solid-svg-icons';

import '../assets/css/sidebar.min.css';

import TodoModal from './TodoModal';
import Calendar from './Calendar';

const Sidebar = memo(() => {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const mouseOnSidebar = useCallback(() => {
    setIsMouseOver(true);
  }, []);
  const mouseLeaveSidebar = useCallback(() => {
    setIsMouseOver(false);
  }, []);

  const openTodoModal = useCallback(() => {
    setModalContent('todo');
    setIsModalOpen(true);
  }, []);
  const openCalendarModal = useCallback(() => {
    setModalContent('calendar');
    setIsModalOpen(true);
  }, []);
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      <div className={`sidebar_wrapper ${isMouseOver ? 'active' : ''}`} onMouseEnter={mouseOnSidebar} onMouseLeave={mouseLeaveSidebar} >
        <div className='openBtn' >
          <FontAwesomeIcon icon={faBars} />
        </div>
        <div className='sideBtns'>
          <div className='todos' onClick={openTodoModal}>
            <FontAwesomeIcon icon={faCheck} />
          </div>
          <div className='calendar'>
            <FontAwesomeIcon icon={faCalendar} onClick={openCalendarModal} />
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className='modal'
        ariaHideApp={false}
      >
        {
          modalContent === 'todo' ? (
            <TodoModal/>
          ) : (
            <Calendar/>
          )
        }
      </Modal>
    </>
  );
});

export default Sidebar;