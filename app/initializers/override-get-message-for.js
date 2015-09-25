import Ember from 'ember';
import ValidatorsMessages from 'ember-cp-validations/validators/messages';

const { Logger:logger } = Ember;

export default {
  name: 'override-get-message-for',

  initialize() {
    ValidatorsMessages.reopen({
      i18n: Ember.inject.service(),

      getMessageFor(type, context = {}) {
        let prefix = this.getWithDefault('prefix', 'errors');
        let key = `${prefix}.${type}`;
        let i18n = this.get('i18n');

        if (i18n && i18n.exists(key)) {
          return i18n.t(key, context);
        }

        logger.warn(`[ember-i18n-cp-validations] Missing translation for validation key: ${key}\nhttp://offirgolan.github.io/ember-cp-validations/docs/validators/messages/index.html`);

        return this._super(...arguments);
      }
    });
  }
};
