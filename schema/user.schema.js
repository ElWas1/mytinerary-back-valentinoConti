import joi from 'joi';

const name = joi.string()
    .pattern(/^[A-Za-z ]+$/)
    .required()
    .min(2)
    .max(30)
    .messages({
        'any.required': 'Name is required',
        'string.empty': 'Name is required',
        'string.min': 'Name is too short',
        'string.max': 'Name is too long'
    })

const lastName = joi.string()
    .pattern(/^[A-Za-z ]+$/)
    .required()
    .min(2)
    .max(30)
    .messages({
        'any.required': 'Surname is required',
        'string.empty': 'Surname is required',
        'string.min': 'Surname is too short',
        'string.max': 'Surname is too long'
    })

const username = joi.string()
    .alphanum()
    .pattern(/^[a-zA-Z0-9!@#%&*()_+\[\]:;,.?~\\-]+$/) // $, <, >, ^, {, } y / no están permitidos
    .required()
    .min(2)
    .max(20)
    .messages({
        'any.required': 'Username is required',
        'string.empty': 'Username is required',
        'string.min': 'Username is too short',
        'string.max': 'Username is too long'
    })

const email = joi.string()
    .required()
    .email({
        minDomainSegments: 2
    })
    .messages({
        'any.required': 'Email is required',
        'string.empty': 'Email is required'
    })

const password = joi.string()
    .required()
    .pattern(/^[a-zA-Z0-9!@#%&*()_+\[\]:;,.?~\\-]+$/) // $, <, >, ^, {, } y / no están permitidos
    .min(8)
    .max(35)
    .messages({
        'any.required': 'Password is required',
        'string.empty': 'Password is required',
        'string.min': 'Password is too short',
        'string.max': 'Password is too long'
    })

const new_password = joi.string()
    .pattern(/^[a-zA-Z0-9!@#%&*()_+\[\]:;,.?~\\-]+$/) // $, <, >, ^, {, } y / no están permitidos
    .min(8)
    .max(35)
    .messages({
        'string.min': 'New password is too short',
        'string.max': 'New password is too long'
    })

const image = joi.string()
    .uri()

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