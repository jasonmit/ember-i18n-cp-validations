# ember-i18n-cp-validations

[![npm Version][npm-badge]][npm]
[![Build Status][travis-badge]][travis]
[![Ember Observer Score](http://emberobserver.com/badges/ember-i18n-cp-validations.svg)](http://emberobserver.com/addons/ember-i18n-cp-validations)
[![Ember badge][ember-badge]][embadge]

Adds support for ember-i18n in ember-cp-validations

## Installation

* `ember install ember-i18n-cp-validations`

## Configuring

Implement the following validation messages across your translations:

```js
// app/locales/en/translations.js

export default {
  errors: {
    description: "This field",
    inclusion: "{{description}} is not included in the list",
    exclusion: "{{description}} is reserved",
    invalid: "{{description}} is invalid",
    confirmation: "{{description}} doesn't match {{on}}",
    accepted: "{{description}} must be accepted",
    empty: "{{description}} can't be empty",
    blank: "{{description}} can't be blank",
    present: "{{description}} must be blank",
    collection: "{{description}} must be a collection",
    singular: "{{description}} can't be a collection",
    tooLong: "{{description}} is too long (maximum is {{max}} characters)",
    tooShort: "{{description}} is too short (minimum is {{min}} characters)",
    before: "{{description}} must be before {{before}}",
    after: "{{description}} must be after {{after}}",
    wrongDateFormat: "{{description}} must be in the format of {{format}}",
    wrongLength: "{{description}} is the wrong length (should be {{is}} characters)",
    notANumber: "{{description}} must be a number",
    notAnInteger: "{{description}} must be an integer",
    greaterThan: "{{description}} must be greater than {{gt}}",
    greaterThanOrEqualTo: "{{description}} must be greater than or equal to {{gte}}",
    equalTo: "{{description}} must be equal to {{is}}",
    lessThan: "{{description}} must be less than {{lt}}",
    lessThanOrEqualTo: "{{description}} must be less than or equal to {{lte}}",
    otherThan: "{{description}} must be other than {{value}}",
    odd: "{{description}} must be odd",
    even: "{{description}} must be even",
    positive: "{{description}} must be positive",
    date: "{{description}} must be a valid date",
    email: "{{description}} must be a valid email address",
    phone: "{{description}} must be a valid phone number",
    url: "{{description}} must be a valid url"
  }
};
```

### Customizing the prefix

To change the errors prefix key from `errors` to any other key, such as `validationErrors` you simply add the following to `app/validators/messages.js`.  Now just ammend your translation files to be nested under the `validationErrors` object instead of `errors`.

```js
// app/validators/messages.js

import ValidatorsMessages from 'ember-cp-validations/validators/messages';

export default ValidatorsMessages.extend({
  prefix: 'validationErrors'
});
```

### Translating Validator description

To translate the description of a Validator specify the `descriptionKey` to match a key in your translations.

```js
// app/models/user.js

import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  username: validator('presence', {
    presence: true,
    descriptionKey: 'key.for.username'
  })
});
```

```js
// app/locales/en/translations.js

export default {
  key: {
    for: {
      username: 'Username'
    }
  }
}

// app/locales/sv/translations.js

export default {
  key: {
    for: {
      username: 'Användarnamn'
    }
  }
}
```

### Overriding default translation key

By default, translations will be resolved to `validatorPrefix.validatorType`.  If you need to override this functionality entirely and specify your own message key, you can do so with `messageKey` on the validator object.

```js
// app/models/user.js

import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  username: validator('presence', {
    presence: true,
    messageKey: 'username.missing'
  })
});
```

## Testing

A common issue, across every ember project relying on initializers, is how do you tests code dependent on an initializer being invoked.

To work around this, invoke the initializer during the `setup` for your test dependent on the initializer.

```js
import { moduleForComponent, test } from 'ember-qunit';
import initialize from 'ember-i18n-cp-validations/initialize';

moduleForComponent('x-product', 'XProductComponent', {
  integration: true,
  setup() {
    initialize(this);
  }
});
```

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

[npm]: https://www.npmjs.org/package/ember-i18n-cp-validations
[npm-badge]: https://img.shields.io/npm/v/ember-i18n-cp-validations.svg?style=flat-square
[travis]: https://travis-ci.org/jasonmit/ember-i18n-cp-validations
[travis-badge]: https://img.shields.io/travis/jasonmit/ember-i18n-cp-validations/master.svg?style=flat-square
[embadge]: http://embadge.io/
[ember-badge]: http://embadge.io/v1/badge.svg?start=1.13.0
