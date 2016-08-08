import Ember from 'ember';
import ValidatorsMessages from '../validators/messages';

const {
  Handlebars,
  Logger:logger,
  computed,
  isPresent,
  isEmpty,
  inject,
  get,
  String: {
    isHTMLSafe
  }
} = Ember;

function unwrap(input) {
  if ((typeof isHTMLSafe === 'function' && isHTMLSafe(input)) || (input instanceof Handlebars.SafeString)) {
    return input.toString();
  }

  return input;
}

export function initialize() {
  ValidatorsMessages.reopen({
    i18n: inject.service(),
    _regex: /\{{(\w+)\}}/g,
    _prefix: computed('prefix', 'i18n.locale', function() {
      const prefix = get(this, 'prefix');

      if (typeof prefix === 'string') {
        if (prefix.length) {
          return prefix + '.';
        }

        return prefix;
      }

      return 'errors.';
    }),
    getDescriptionFor(attribute, options = {}) {
      const i18n = get(this, 'i18n');
      const prefix = get(this, '_prefix');
      let key = `${prefix}description`;
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
      const i18n = get(this, 'i18n');
      const prefix = get(this, '_prefix');
      const key = isPresent(options.messageKey) ? options.messageKey : `${prefix}${type}`;

      if (i18n && i18n.exists(key)) {
        return this.formatMessage(unwrap(i18n.t(key, options)));
      }

      logger.warn(`[ember-i18n-cp-validations] Missing translation for validation key: ${key}\nhttp://offirgolan.github.io/ember-cp-validations/docs/messages/index.html`);

      return this._super(...arguments);
    }
  });
}

export default {
  name: 'ember-i18n-cp-validations',
  initialize
};
