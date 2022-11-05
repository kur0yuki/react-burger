import PropTypes from 'prop-types';

export const ingType = PropTypes.shape({
    _id: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    type: PropTypes.string
})

export const url = 'https://norma.nomoreparties.space/api/ingredients'