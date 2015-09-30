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
    // placeholder for the attribute description
    attributeDescription: 'This field',
    inclusion: "{{attributeDescription}} is not included in the list",
    exclusion: "{{attributeDescription}} is reserved",
    invalid: "{{attributeDescription}} is invalid",
    confirmation: "{{attributeDescription}} doesn't match {{attribute}}",
    accepted: "{{attributeDescription}} must be accepted",
    empty: "{{attributeDescription}} can't be empty",
    blank: "{{attributeDescription}} can't be blank",
    present: "{{attributeDescription}} must be blank",
    collection: "{{attributeDescription}} must be a collection",
    singular: "{{attributeDescription}} can't be a collection",
    tooLong: "{{attributeDescription}} is too long (maximum is {{count}} characters)",
    tooShort: "{{attributeDescription}} is too short (minimum is {{count}} characters)",
    before: "{{attributeDescription}} must be before {date}",
    after: "{{attributeDescription}} must be after {date}",
    wrongDateFormat: "{{attributeDescription}} must be in the format of {date}",
    wrongLength: "{{attributeDescription}} is the wrong length (should be {{count}} characters)",
    notANumber: "{{attributeDescription}} is not a number",
    notAnInteger: "{{attributeDescription}} must be an integer",
    greaterThan: "{{attributeDescription}} must be greater than {{count}}",
    greaterThanOrEqualTo: "{{attributeDescription}} must be greater than or equal to {{count}}",
    equalTo: "{{attributeDescription}} must be equal to {{count}}",
    lessThan: "{{attributeDescription}} must be less than {{count}}",
    lessThanOrEqualTo: "{{attributeDescription}} must be less than or equal to {{count}}",
    otherThan: "{{attributeDescription}} must be other than {{count}}",
    odd: "{{attributeDescription}} must be odd",
    even: "{{attributeDescription}} must be even",
    positive: "{{attributeDescription}} must be positive",
    date: "{{attributeDescription}} must be a valid date",
    email: "{{attributeDescription}} must be a valid email address",
    phone: "{{attributeDescription}} must be a valid phone number",
    url: "{{attributeDescription}} must be a valid url"
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
