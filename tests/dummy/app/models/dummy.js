import { inject as service } from '@ember/service';
import EmberObject, { computed, get } from '@ember/object';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  username: validator('length', {
    message: 'oops, {{description}} length is invalid, expected {{max}}',
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
  age: [
    validator('presence', true),
    validator('range', {
      range: [1, 100],

      /**
       * Optional, but I'd expect you want to override the
       * message key if you are passing attributes like `placeholder`
       * into the translation.
       */
      messageKey: 'age.outOfRange',

      placeholder: computed('model.{age,i18n.locale}', function() {
        const model = get(this, 'model');
        const [start, end] = get(this, 'range');
        const age = parseInt(get(model, 'age'), 10);
        const i18n = get(model, 'i18n');

        if (age < start) {
          return i18n.t('age.lessThan');
        } else if (age > end) {
          return i18n.t('age.greatThan');
        }
      })
    })
  ],
  passwordConfirmation: validator('confirmation', {
    on: 'password',
    messageKey: 'errors.passwordConfirmation'
  }),
  email: [validator('presence', true), validator('format', { type: 'email' })],
  emailConfirmation: [
    validator('presence', true),
    validator('confirmation', {
      on: 'email',
      description: 'Email addresses'
    })
  ]
});

export default EmberObject.extend(Validations, {
  i18n: service(),
  username: '',
  password: '',
  email: '',
  age: 0
});
