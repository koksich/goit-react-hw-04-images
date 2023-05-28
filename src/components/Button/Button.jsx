import PropTypes from 'prop-types';

import { ButtonContainer, Btn } from "./Button.styled"

export const Button = ({onLoadMore}) => {
    return (
      <ButtonContainer>
        <Btn type="button" aria-label="Load more" onClick={onLoadMore}>
          Load more...
        </Btn>
      </ButtonContainer>
    );
}

Button.propTypes = {
  onLoadMore: PropTypes.func,
}