import Vuex from 'vuex';
import {
  addToCart,
  createPLPQuery,
  queryApi,
  updateCart,
} from '../../utils/api';

const store = new Vuex.Store({
  state: {
    loading: {
      products: false,
      filters: false,
      cart: false,
      cartItemId: '',
    },
    collection: '',
    products: [],
    filters: [],
    selectedFilters: {},
    page: {
      pageNumber: 1,
      hasNextPage: false,
      hasPreviousPage: false,
      nextCursor: '',
      previousCursor: '',
    },
    cart: {
      cartOpen: false,
      cartItems: [],
      total: 0,
    },
    cartCounter: document.querySelector('.js-cart-quantity'),
  },
  mutations: {
    setCollection(state, collection) {
      state.collection = collection;
    },
    setLoading(state, { key, value }) {
      state.loading[key] = value;
    },
    setProducts(state, products) {
      state.products = products;
    },
    setFilters(state, filters) {
      state.filters = filters;
    },
    setSelectedFilter(state, { key, value }) {
      let current = { ...state.selectedFilters };

      if (!current[key]) {
        current[key] = [];
      }

      let index = current[key].indexOf(value);
      if (index !== -1) {
        if (key === 'sort by' || key === 'availability') {
          current[key] = [];
        } else current[key].splice(index, 1);
      } else {
        if (key === 'sort by' || key === 'availability') {
          current[key] = [value];
        } else current[key].push(value);
      }

      state.selectedFilters = current;
    },
    setPage(state, { pageInfo, change = 0 }) {
      if (pageInfo != null) {
        state.page = {
          pageNumber: change !== 0 ? state.page.pageNumber + change : 1,
          hasNextPage: pageInfo.hasNextPage,
          hasPreviousPage: pageInfo.hasPreviousPage,
          nextCursor: pageInfo.endCursor,
          previousCursor: pageInfo.startCursor,
        };
      } else {
        state.page = {
          pageNumber: 1,
          hasNextPage: false,
          hasPreviousPage: false,
          nextCursor: '',
          previousCursor: '',
        };
      }
    },
    toggleCartOpen(state) {
      state.cart.cartOpen = !state.cart.cartOpen;
    },
    openCart(state) {
      state.cart.cartOpen = true;
    },
    setCart(state, cart) {
      state.cart.cartItems = cart.items;
      state.cart.total = cart.total_price;
      state.cartCounter.textContent = cart.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
    },
    setCartLoading(state, { value, id }) {
      state.loading.cart = value;
      state.loading.cartItemId = id;
    },
  },
  actions: {
    toggleCart({ commit }) {
      commit('toggleCartOpen');
    },
    updateSelectedFilters({ commit }, payload) {
      commit('setSelectedFilter', payload);
    },
    async fetchFilters({ commit }) {
      const query = `{
        metaobjects(type: "filter", first: 10) {
          nodes {
            type
            fields {
              key
              value
            }
          }
        }
      }`;

      commit('setLoading', { key: 'filters', value: true });

      queryApi(query).then((response) => {
        let data = [...response.metaobjects.nodes];
        data.sort((a, b) => {
          const orderA = a.fields.find((field) => field.key === 'order').value;
          const orderB = b.fields.find((field) => field.key === 'order').value;
          return parseFloat(orderA) - parseFloat(orderB);
        });

        // Map the sorted nodes to an array of objects with key and values properties
        data = data.map((node) => {
          const key = node.fields.find((field) => field.key === 'name').value;
          const values = JSON.parse(
            node.fields.find((field) => field.key === 'values').value
          );
          return {
            key,
            values,
          };
        });

        commit('setLoading', { key: 'filters', value: false });
        commit('setFilters', data);
      });
    },
    async fetchProducts({ commit }, pageChange = 0) {
      try {
        commit('setLoading', { key: 'products', value: true });
        let cursor = '';
        if (pageChange === 1) cursor = this.state.page.nextCursor;
        else if (pageChange === -1) cursor = this.state.page.previousCursor;
        const query = createPLPQuery(
          this.state.collection,
          {
            ...this.state.selectedFilters,
          },
          { pageChange, cursor }
        );
        queryApi(query).then((response) => {
          commit('setProducts', response.collection.products.nodes);
          commit('setPage', {
            pageInfo: response.collection.products.pageInfo,
            change: pageChange,
          });
          commit('setLoading', { key: 'products', value: false });
        });
      } catch (error) {
        commit('setPage', { products: [], change: 0 });
        commit('setLoading', { key: 'products', value: false });
      }
    },
    initCollection({ commit }) {
      commit('setCollection', window.location.pathname.split('/').pop());
    },
    initCart({ commit, dispatch, getters }) {
      window.cart = {};
      window.cart.toggleCart = () => {
        commit('toggleCartOpen');
      };
      window.cart.getCartItemCount = () => getters.getCartItemCount;
      window.cart.addToCart = (id, quantity, sellingPlan) =>
        dispatch('addProductToCart', { id, quantity, sellingPlan });
      window.cart.initCart = (cartData) => commit('setCart', cartData);
    },
    addProductToCart(
      { commit, dispatch, getters },
      { id, quantity, sellingPlan }
    ) {
      commit('openCart');
      let { cartItems, total } = { ...getters.getCart };
      window.search = { id, cartItems, sellingPlan };
      let index = -1;

      if (sellingPlan)
        index = cartItems.findIndex(
          (cartItem) =>
            cartItem.variant_id == id &&
            cartItem.selling_plan_allocation?.selling_plan.id == sellingPlan
        );
      else
        index = cartItems.findIndex(
          (cartItem) =>
            cartItem.variant_id == id &&
            cartItem.selling_plan_allocation == undefined
        );
      if (index === -1) {
        commit('setCartLoading', { value: true, id });
        addToCart(id, quantity, sellingPlan).then((response) => {
          for (let item of response.items) {
            cartItems.push(item);
            total += item.discounted_price * item.quantity;
          }
          commit('setCart', { items: cartItems, total_price: total });
          commit('setCartLoading', { value: false, id: '' });
        });
      } else {
        dispatch('updateCartItems', {
          id: cartItems[index].key,
          quantity: Number(quantity) + Number(cartItems[index].quantity),
        });
      }
    },
    updateCartItems({ commit }, { id, quantity }) {
      commit('setCartLoading', { value: true, id });
      if (quantity < 0) return;
      updateCart(id, quantity).then((response) => {
        commit('setCartLoading', { value: false, id: '' });
        commit('setCart', response);
      });
    },
  },
  getters: {
    getProducts(state) {
      return state.products;
    },
    getFilters(state) {
      return state.filters;
    },
    getSelectedFilters(state) {
      return state.selectedFilters;
    },
    getCollection(state) {
      return state.collection;
    },
    getLoading(state) {
      return state.loading;
    },
    getPage(state) {
      return state.page;
    },
    getCartOpen(state) {
      return state.cart.cartOpen;
    },
    getCartItemCount(state) {
      return state.cart.cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
    },
    getCart(state) {
      return state.cart;
    },
  },
});

export default store;
