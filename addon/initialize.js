import Ember from 'ember';
import ValidatorsMessages from 'ember-cp-validations/validators/messages';

const { Logger:logger, isEmpty, inject, get } = Ember;

function unwrap(input) {
  if (input instanceof Ember.Handlebars.SafeString) {
    return input.toString();
  }

  return input;
}

export default function() {
  ValidatorsMessages.reopen({
    i18n: inject.service(),
    prefix: 'errors',
    _regex: /\{{(\w+)\}}/g,

    getDescriptionFor(attribute, options = {}) {
      const i18n = get(this, 'i18n');
      let key = `${get(this, 'prefix')}.description`;
      let foundCustom;

      if (!isEmpty(options.descriptionKey)) {
        key = options.descriptionKey;
        foundCustom = true;
      } else if (!isEmpty(options.description)) {
        return options.description;
      }

      if (i18n) {
        if (i18n.exists(key)) {
          return unwrap(i18n.t(key, options));
        } else if (foundCustom) {
          logger.warn(`Custom descriptionKey ${key} provided but does not exist in i18n translations.`);
        }
      }

      return this._super(...arguments);
    },

    getMessageFor(type, options = {}) {
      const key = `${get(this, 'prefix')}.${type}`;
      const i18n = get(this, 'i18n');

      if (i18n && i18n.exists(key)) {
        return this.formatMessage(unwrap(i18n.t(key, options)));
      }

      logger.warn(`[ember-i18n-cp-validations] Missing translation for validation key: ${key}\nhttp://offirgolan.github.io/ember-cp-validations/docs/messages/index.html`);

      return this._super(...arguments);
    }
  });
}
