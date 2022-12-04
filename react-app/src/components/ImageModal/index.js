import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import Image from './ImageForm';
import './Image.css'

function ImageModal() {
    const [ showModal, setShowModal ] = useState(false);

    return (
        <>
            <button className="calendarModalButton" onClick={() => setShowModal(true)}>Add image/notes</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <Image className="imageModal" onClose={() => setShowModal(false)} />
                </Modal>
            )}
        </>
    )
}

export default ImageModal;