import RSVP from 'rsvp';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit, fillIn } from '@ember/test-helpers';

function contains(selector, string, assert, ctx) {
  const element = ctx.element.querySelector(selector);

  if (!element) {
    return assert.ok(false, `can't find element: ${selector}`);
  }

  const text = element.textContent || element.innerText;

  return assert.equal(text.replace(/^\s+|\s+$/g, ''), string);
}

module('Acceptance: Smoke', function(hooks) {
  setupApplicationTest(hooks);

  test('basic translations', async function(assert) {
    assert.expect(3);
    await visit('/');
    contains('.email-validation', `This field can't be blank`, assert, this);
    await fillIn('#email', 'you@example.com');
    contains('.email-validation', ``, assert, this);
    await fillIn('#email', 'invalid-email');
    contains(
      '.email-validation',
      `This field must be a valid email address`,
      assert,
      this
    );
  });

  test('inline message', async function(assert) {
    assert.expect(2);
    await visit('/');
    contains('.password-validation', `This field can't be blank`, assert, this);
    await fillIn('#password', 'err');
    contains('.password-validation', `oops, length is invalid`, assert, this);
  });

  test('validator object can be used within translation message', async function(assert) {
    assert.expect(2);
    await visit('/');
    contains('.age-validation', `Must be over one for entry`, assert, this);

    await fillIn('#age', 101);
    contains(
      '.age-validation',
      `Must be less than one hundred for entry`,
      assert,
      this
    );
  });

  test('translations with custom description', async function(assert) {
    assert.expect(3);

    await visit('/');
    contains('.email-validation', `This field can't be blank`, assert, this);
    contains(
      '.emailConfirmation-validation',
      `This field can't be blank`,
      assert,
      this
    );

    await RSVP.all([
      fillIn('#email', 'foo@bar.com'),
      fillIn('#emailConfirmation', 'xx@bar.com')
    ]);

    contains(
      '.emailConfirmation-validation',
      `Email addresses doesn't match email`,
      assert,
      this
    );
  });

  test('translations with descriptionKey', async function(assert) {
    await visit('/');
    contains(
      '.username-validation',
      `oops, Username length is invalid, expected 8`,
      assert,
      this
    );
  });

  test('translation with messageKey', async function(assert) {
    await visit('/');
    contains(
      '.passwordConfirmation-validation',
      `Passwords doesn't match`,
      assert,
      this
    );
  });
});
