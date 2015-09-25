import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

var Validations = buildValidations({
  username: validator('presence', true),
  password: [
    validator('presence', true),
    validator('length', {
      min: 4,
      max: 8
    })
  ],
  email: [
    validator('presence', true),
    validator('format', { type: 'email' })
  ],
  emailConfirmation: [
    validator('presence', true),
    validator('confirmation', {
      on: 'email',
      message: 'do not match',
      attributeDescription: 'Email addresses'
    })
  ]
});

export default Ember.Object.extend(Validations, {
  username: '',
  password: '',
  email: ''
});
