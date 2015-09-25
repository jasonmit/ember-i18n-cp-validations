import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		return this.container.lookup('model:dummy');
	}
});
