import Alpine from 'alpinejs';
import collapse from '@alpinejs/collapse';

export default () => {
	window.Alpine = Alpine;
	Alpine.plugin(collapse);
	Alpine.start();
};