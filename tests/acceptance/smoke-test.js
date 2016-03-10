import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

let application;

const { run:emberRun, RSVP } = Ember;

function contains(selector, string) {
  const element = find(selector)[0];

  if (!element) {
    return ok(false, `can't find element: ${selector}`);
  }

  const text = element.textContent || element.innerText;
  return equal(text.replace(/^\s+|\s+$/g, ''), string);
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

test('static translations', (assert) => {
  assert.expect(3);
  visit('/');

  andThen(() => {
    contains('.email-validation', `This field can't be blank`);

    fillIn('#email', 'you@example.com').then(function() {
      contains('.email-validation', ``);
    });

    fillIn('#email', 'invalid-email').then(function() {
      contains('.email-validation', `This field must be a valid email address`);
    });
  });
});

test('inline message', (assert) => {
  assert.expect(2);
  const done = assert.async();
  visit('/');

  andThen(() => {
    contains('.password-validation', `This field can't be blank`);

    fillIn('#password', 'err').then(function() {
      contains('.password-validation', `oops, length is invalid`);
      done();
    });
  });
});

test('static translations with custom description', (assert) => {
  assert.expect(3);
  const done = assert.async();

  visit('/');

  andThen(() => {
    contains('.email-validation', `This field can't be blank`);
    contains('.emailConfirmation-validation', `This field can't be blank`);

    RSVP.all([
      fillIn('#email', 'foo@bar.com'),
      fillIn('#emailConfirmation', 'xx@bar.com')
    ]).then(function() {
      contains('.emailConfirmation-validation', `Email addresses doesn't match email`);
      done();
    });
  });
});
