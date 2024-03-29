import PropTypes from 'prop-types';

export const ingType = PropTypes.shape({
    _id: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    type: PropTypes.string
})

export const base_url = 'https://norma.nomoreparties.space/api/'
export const ingUrl =  "ingredients"
export const orderUrl = "orders"
export const signInUrl = "auth/login"
export const registerUrl = "auth/register"
export const signOutUrl = "auth/logout"
export const refreshTokenUrl = "auth/token"
export const userUrl = "auth/user"
export const passwordResetUrl = "password-reset"
export const passwordResetSaveUrl = "password-reset/reset"
