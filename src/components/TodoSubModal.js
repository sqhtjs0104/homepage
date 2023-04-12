import React, { memo, useCallback } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { cloneDeep } from 'lodash';

const defaultModalStyle = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		margin: '0',
		padding: '0',
		transform: 'translate(-50%, -50%)'
	}
}

const Window = styled.div`
	width: 300px;
	height: 400px;
	padding: 30px 20px 20px 20px;
	position: relative;
	box-sizing: border-box;
	display: flex;
	flex-flow: column nowrap;

	button {
		border: none;
		border-radius: 5px;
		color: #fff;

		&:hover {
			cursor: pointer;
			scale: 1.05;
		}

		&:active {
			scale: 1;
		}

		&.closeBtn {
			position: absolute;
			top: 20px;
			right: 20px;
			background-color: #aaa;
			width: 25px;
			height: 25px;
		}

		&.saveBtn {
			width: 100%;
			height: 30px;
			background-color: #313186;
		}
	}

	h3 {
		margin: 0 0 10px 0;
		font-size: 16px;
	}

	input, textarea {
		margin-bottom: 20px;
		width: 100%;
		border-radius: 5px;
		padding: 5px;
		box-sizing: border-box;
		resize: none;
	}
`

const TodoSubModal = memo(props => {
	const onTodoModify = useCallback(e => {
		e.preventDefault();
		const current = e.currentTarget;

		const item = {
			title: current.title.value,
			description: current.description.value ? current.description.value : null,
			deadline: current.deadline.value ? current.deadline.value : null,
			checked: props.nowTodo?.checked ? true : false
		};
		console.log(item);
		props.setTodos(state => {
			const temp = cloneDeep(state);
			temp[props.index] = item;
			return temp;
		});

		props.closeModal();
	}, [props]);

  return (
    <Modal
			isOpen={props.isOpen}
			closeModal={props.closeModal}
			style={defaultModalStyle}
			onRequestClose={props.closeModal}
		>
			<Window>
				<button className='closeBtn' onClick={props.closeModal}>
					<FontAwesomeIcon icon={faXmark} />
				</button>
				<form id='todoForm' onSubmit={onTodoModify}>
					<h3>Title</h3>
					<input
						type="text"
						name='title'
						placeholder='Insert title of Todo'
						defaultValue={props.nowTodo?.title ? props.nowTodo.title : ''}
					/>
					<h3>Description</h3>
					<textarea
						rows='5'
						name='description'
						placeholder='Insert description of Todo'
						defaultValue={props.nowTodo?.description ? props.nowTodo.description : ''}
					/>
					<h3>Deadline</h3>
					<input
						type="date"
						name='deadline'
						defaultValue={props.nowTodo?.deadline ? props.nowTodo.deadline : ''}
					/>
					<button type='submit' className='saveBtn'>Save To Do Item</button>
				</form>
			</Window>
    </Modal>
  );
});

Modal.setAppElement('#root');
export default TodoSubModal;