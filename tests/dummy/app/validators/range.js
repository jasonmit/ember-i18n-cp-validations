import Base from 'ember-cp-validations/validators/base';

export default Base.extend({
  validate(value, options) {
    const { range } = options;

    if (!Array.isArray(range) && range.length === 2) {
      throw new Error('Range must be an array of length two.  Example: [0, 100]');
    }

    value = Number(value);

    if (value < range[0] || value > range[1]) {
      return this.createErrorMessage('outOfRange', value, options);
    }

    return true;
  }
});
