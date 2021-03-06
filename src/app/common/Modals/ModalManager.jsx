import React from 'react';
import { useSelector } from 'react-redux';
import Login from '../../../features/auth/Login';
import Register from '../../../features/auth/Register';
import TestModals from '../../../features/sandbox/TestModals';
const ModalManager = () => {
	const modalLookUp = {
		TestModals,
		Login,
		Register,
	};
	const currentModal = useSelector((state) => state.modals);
	let renderedModal;
	if (currentModal) {
		const { modalType, modalProps } = currentModal;
		const ModalComponent = modalLookUp[modalType];
		renderedModal = <ModalComponent {...modalProps} />;
	}
	return <span>{renderedModal}</span>;
};

export default ModalManager;
