import { Component } from "react"
import { createPortal } from "react-dom";

import PropTypes from 'prop-types';

import { Overlay, Img } from "./Modal.styled";


const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component { 
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }
    
    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = e => {
        if (e.code === 'Escape') {
            this.props.onClose();
        }
    }

    handleBackdropClick = e => {
        if (e.currentTarget === e.target) {
            this.props.onClose();
    }
}

    render() {
          return createPortal(
            <Overlay onClick={this.handleBackdropClick}>
              <div>
                      <Img src={this.props.largeImageURL} alt="" />
              </div>
            </Overlay>,
            modalRoot
          );
    }
  
}

Modal.propTypes = {
    onClose: PropTypes.func,
}