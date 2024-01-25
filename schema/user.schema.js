import joi from 'joi';

const name = joi.string()
    .pattern(/^[A-Za-z ]+$/)
    .required()
    .min(2)
    .max(30)
    .messages({
        'any.required': 'NAME_REQUIRED',
        'string.empty': 'NAME_REQUIRED',
        'string.min': 'NAME_TOO_SHORT',
        'string.max': 'NAME_TOO_LONG'
    })

const lastName = joi.string()
    .pattern(/^[A-Za-z ]+$/)
    .required()
    .min(2)
    .max(30)
    .messages({
        'any.required': 'SURNAME_REQUIRED',
        'string.empty': 'SURNAME_REQUIRED',
        'string.min': 'SURNAME_TOO_SHORT',
        'string.max': 'SURNAME_TOO_LONG'
    })

const username = joi.string()
    .alphanum()
    .pattern(/^[a-zA-Z0-9!@#%&*()_+\[\]:;,.?~\\-]+$/) // $, <, >, ^, {, } y / no están permitidos
    .required()
    .min(2)
    .max(20)
    .messages({
        'any.required': 'USERNAME_REQUIRED',
        'string.empty': 'USERNAME_REQUIRED',
        'string.min': 'USERNAME_TOO_SHORT',
        'string.max': 'USERNAME_TOO_LONG'
    })

const email = joi.string()
    .required()
    .email({
        minDomainSegments: 2
    })
    .messages({
        'any.required': 'EMAIL_REQUIRED',
        'string.empty': 'EMAIL_REQUIRED'
    })

const password = joi.string()
    .required()
    .pattern(/^[a-zA-Z0-9!@#%&*()_+\[\]:;,.?~\\-]+$/) // $, <, >, ^, {, } y / no están permitidos
    .min(8)
    .max(35)
    .messages({
        'any.required': 'PASSWORD_REQUIRED',
        'string.empty': 'PASSWORD_REQUIRED',
        'string.min': 'PASSWORD_TOO_SHORT',
        'string.max': 'PASSWORD_TOO_LONG'
    })

const new_password = joi.string()
    .pattern(/^[a-zA-Z0-9!@#%&*()_+\[\]:;,.?~\\-]+$/) // $, <, >, ^, {, } y / no están permitidos
    .min(8)
    .max(35)
    .messages({
        'string.min': 'PASSWORD_TOO_SHORT',
        'string.max': 'PASSWORD_TOO_LONG'
    })

const image = joi.string()
    .required()
    .uri()
    .messages({
        'any.required': 'PASSWORD_REQUIRED',
        'string.empty': 'PASSWORD_REQUIRED'
    })

const country = joi.string()
    .required()
    .messages({
        'any.required': 'COUNTRY_REQUIRED',
        'string.empty': 'COUNTRY_REQUIRED'
    })

export const createUserSchema = joi.object({
    name: name,
    last_name: lastName,
    username: username,
    email: email,
    password: password,
    image: image,
    country: country,
})

export const signInSchema = joi.object({
    email: email,
    password: password
})