import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

let application;

const { run:emberRun, RSVP } = Ember;

function contains(selector, string, assert) {
  const element = find(selector)[0];

  if (!element) {
    return ok(false, `can't find element: ${selector}`);
  }

  const text = element.textContent || element.innerText;
  return assert.equal(text.replace(/^\s+|\s+$/g, ''), string);
}

module('Acceptance: Smoke', {
  beforeEach() {
    application = startApp();
  },
  afterEach() {
    if (application) {
      emberRun(application, 'destroy');
    }
  }
});

test('basic translations', (assert) => {
  assert.expect(3);
  visit('/');

  andThen(() => {
    contains('.email-validation', `This field can't be blank`, assert);

    fillIn('#email', 'you@example.com').then(function() {
      contains('.email-validation', ``, assert);
    });

    fillIn('#email', 'invalid-email').then(function() {
      contains('.email-validation', `This field must be a valid email address`, assert);
    });
  });
});

test('inline message', (assert) => {
  assert.expect(2);
  const done = assert.async();

  visit('/');

  andThen(() => {
    contains('.password-validation', `This field can't be blank`, assert);

    fillIn('#password', 'err').then(() => {
      contains('.password-validation', `oops, length is invalid`, assert);
      done();
    });
  });
});

test('validator object can be used within translation message', (assert) => {
  assert.expect(2);
  const done = assert.async();

  visit('/');

  andThen(() => {
    contains('.age-validation', `Must be over one for entry`, assert);

    fillIn('#age', 101).then(() => {
      contains('.age-validation', `Must be less than one hundred for entry`, assert);
      done();
    });
  });
});

test('translations with custom description', (assert) => {
  assert.expect(3);
  const done = assert.async();

  visit('/');

  andThen(() => {
    contains('.email-validation', `This field can't be blank`, assert);
    contains('.emailConfirmation-validation', `This field can't be blank`, assert);

    RSVP.all([
      fillIn('#email', 'foo@bar.com'),
      fillIn('#emailConfirmation', 'xx@bar.com')
    ]).then(() => {
      contains('.emailConfirmation-validation', `Email addresses doesn't match email`, assert);
      done();
    });
  });
});

test('translations with descriptionKey', (assert) => {
  visit('/');

  andThen(() => {
    contains('.username-validation', `oops, Username length is invalid, expected 8`, assert);
  });
});

test('translation with messageKey', (assert) => {
  visit('/');

  andThen(() => {
    contains('.passwordConfirmation-validation', `Passwords doesn't match`, assert);
  });
});
