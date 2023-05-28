import {  useEffect } from "react"
import { createPortal } from "react-dom";

import PropTypes from 'prop-types';

import { Overlay, Img } from "./Modal.styled";


const modalRoot = document.querySelector('#modal-root');

export const Modal = ({onClose, largeImageURL}) => { 

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => { window.removeEventListener('keydown', handleKeyDown) };
    })
    
    
   const  handleKeyDown = e => {
        if (e.code === 'Escape') {
            onClose();
        }
    }

   const  handleBackdropClick = e => {
        if (e.currentTarget === e.target) {
            onClose();
    }
}

    
          return createPortal(
            <Overlay onClick={handleBackdropClick}>
              <div>
                      <Img src={largeImageURL} alt="" />
              </div>
            </Overlay>,
            modalRoot
          );

  
}

Modal.propTypes = {
    onClose: PropTypes.func,
}