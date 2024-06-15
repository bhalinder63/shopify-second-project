import { createApp } from 'vue';

export const getPropsFromJSON = (propsEl) => {
  const propsJsonEl = propsEl && document.querySelector(propsEl);

  if (propsJsonEl) {
    try {
      return JSON.parse(propsJsonEl.innerHTML);
    } catch (e) {
      return {};
    }
  }
  return {};
};

export const vueWrapper = (
  component = null,
  targetElementSelector = null,
  propsJSONId = null
) => {
  const targetElement = document.querySelector(targetElementSelector);

  if (!component || !targetElement) {
    alert(
      'Check vue-wrapper.js file , parentComponent and element required to create vue instance'
    );
    return;
  }

  const data = getPropsFromJSON(propsJSONId);

  createApp(component, { data }).mount(targetElementSelector);
};
