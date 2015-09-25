# ember-i18n-cp-validations

Adds support for ember-i18n in ember-cp-validations

## Installation

* `ember install ember-i18n-cl-validations`

## Configuring

Implement the following validation messages across your translations:

```js
// app/locales/en/translations.js
export default {
  errors: {
    inclusion: "is not included in the list",
    exclusion: "is reserved",
    invalid: "is invalid",
    confirmation: "doesn't match {attribute}",
    accepted: "must be accepted",
    empty: "can't be empty",
    blank: "can't be blank",
    present: "must be blank",
    collection: "must be a collection",
    singular: "can't be a collection",
    tooLong: "is too long (maximum is {count} characters)",
    tooShort: "is too short (minimum is {count} characters)",
    before: "must be before {date}",
    after: "must be after {date}",
    wrongDateFormat: "must be in the format of {date}",
    wrongLength: "is the wrong length (should be {count} characters)",
    notANumber: "is not a number",
    notAnInteger: "must be an integer",
    greaterThan: "must be greater than {count}",
    greaterThanOrEqualTo: "must be greater than or equal to {count}",
    equalTo: "must be equal to {count}",
    lessThan: "must be less than {count}",
    lessThanOrEqualTo: "must be less than or equal to {count}",
    otherThan: "must be other than {count}",
    odd: "must be odd",
    even: "must be even",
    positive: "must be positive",
    date: "must be a valid date",
    email: "must be a valid email address",
    phone: "must be a valid phone number",
    url: "must be a valid url"
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
