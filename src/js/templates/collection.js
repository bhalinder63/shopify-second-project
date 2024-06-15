import 'Styles/templates/collection.scss';

import { CollectionsSlider } from '../components/shared/collections-slider';

CollectionsSlider();

import CollectionApp from '../vue/plp/Collection.vue';

import { createApp } from 'vue';
import store from '../vue/store'; // Vuex store

const app = createApp(CollectionApp);
app.use(store);
app.mount('#collectionData');
