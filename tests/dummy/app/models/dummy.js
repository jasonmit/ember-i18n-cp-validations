import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

var Validations = buildValidations({
  username: validator('length', {
    message: 'oops, {{description}} length is invalid',
    descriptionKey: 'errors.usernameDescription',
    min: 4,
    max: 8
  }),
  password: [
    validator('presence', true),
    validator('length', {
      message: 'oops, length is invalid',
      min: 4,
      max: 8
    })
  ],
  passwordConfirmation: validator('confirmation', {
    on: 'password',
    messageKey: 'errors.passwordConfirmation'
  }),
  email: [
    validator('presence', true),
    validator('format', { type: 'email' })
  ],
  emailConfirmation: [
    validator('presence', true),
    validator('confirmation', {
      on: 'email',
      description: 'Email addresses'
    })
  ]
});

export default Ember.Object.extend(Validations, {
  username: '',
  password: '',
  email: ''
});
