# ember-i18n-cp-validations

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
    confirmation: "{{description}} doesn't match {{attribute}}",
    accepted: "{{description}} must be accepted",
    empty: "{{description}} can't be empty",
    blank: "{{description}} can't be blank",
    present: "{{description}} must be blank",
    collection: "{{description}} must be a collection",
    singular: "{{description}} can't be a collection",
    tooLong: "{{description}} is too long (maximum is {{count}} characters)",
    tooShort: "{{description}} is too short (minimum is {{count}} characters)",
    before: "{{description}} must be before {date}",
    after: "{{description}} must be after {date}",
    wrongDateFormat: "{{description}} must be in the format of {{date}}",
    wrongLength: "{{description}} is the wrong length (should be {{count}} characters)",
    notANumber: "{{description}} is not a number",
    notAnInteger: "{{description}} must be an integer",
    greaterThan: "{{description}} must be greater than {{count}}",
    greaterThanOrEqualTo: "{{description}} must be greater than or equal to {{count}}",
    equalTo: "{{description}} must be equal to {{count}}",
    lessThan: "{{description}} must be less than {{count}}",
    lessThanOrEqualTo: "{{description}} must be less than or equal to {{count}}",
    otherThan: "{{description}} must be other than {{count}}",
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

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
