import Ember from 'ember';
import ValidatorsMessages from 'ember-cp-validations/validators/messages';

const { Logger:logger } = Ember;

function unwrap(input) {
  if (input instanceof Ember.Handlebars.SafeString) {
    return input.toString();
  }

  return input;
}

export default function() {
  ValidatorsMessages.reopen({
    i18n: Ember.inject.service(),
    prefix: 'errors',
    _regex: /\{{(\w+)\}}/g,

    getDescriptionFor(attribute, context = {}) {
      if (!Ember.isEmpty(context.description)) {
        return context.description;
      }

      const key = `${this.get('prefix')}.description`;
      const i18n = this.get('i18n');

      if (i18n && i18n.exists(key)) {
        return unwrap(i18n.t(key, context));
      }

      return this._super(...arguments);
    },

    getMessageFor(type, context = {}) {
      const key = `${this.get('prefix')}.${type}`;
      const i18n = this.get('i18n');

      if (i18n && i18n.exists(key)) {
        return this.formatMessage(unwrap(i18n.t(key, context)));
      }

      logger.warn(`[ember-i18n-cp-validations] Missing translation for validation key: ${key}\nhttp://offirgolan.github.io/ember-cp-validations/docs/messages/index.html`);

      return this._super(...arguments);
    }
  });
}
