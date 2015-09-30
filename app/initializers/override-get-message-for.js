import Ember from 'ember';
import ValidatorsMessages from 'ember-cp-validations/validators/messages';

const { Logger:logger } = Ember;

export default {
  name: 'override-get-message-for',

  initialize() {
    ValidatorsMessages.reopen({
      i18n: Ember.inject.service(),
      prefix: 'errors',
      _regex: /\{\{(\w+)\}\}/g,

      defaultAttributeDescription: Ember.computed('i18n.locale', 'prefix', function() {
        let key = `${this.get('prefix')}.attributeDescription`;
        let i18n = this.get('i18n');

        if (i18n && i18n.exists(key)) {
          return i18n.t(key, context);
        }

        return 'This field';
      }),

      getMessageFor(type, context = {}) {
        let key = `${this.get('prefix')}.${type}`;
        let i18n = this.get('i18n');
        let msg;

        if (i18n && i18n.exists(key)) {
          return this.formatMessage(i18n.t(key, context), context);
        }

        logger.warn(`[ember-i18n-cp-validations] Missing translation for validation key: ${key}\nhttp://offirgolan.github.io/ember-cp-validations/docs/validators/messages/index.html`);

        return this._super(...arguments);
      }
    });
  }
};
