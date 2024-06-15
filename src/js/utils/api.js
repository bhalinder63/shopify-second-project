// Consists of utility functions that use fetch to retrieve data from the Shopify Storefront API
const { STOREFRONT_ACCESS_TOKEN, API_ENDPOINT } = process.env;

export function createPLPQuery(collection, filters, { pageChange, cursor }) {
  let filterList = [];
  let sortQuery = '';
  for (let filter of Object.keys(filters)) {
    if (filters[filter].length > 0) {
      if (filter === 'brand')
        filters[filter].forEach((tag) =>
          filterList.push(`{ productVendor: "${tag}" }`)
        );
      else if (filter === 'availability') {
        switch (filters[filter][0]) {
          case 'in stock':
            filterList.push(`{ available: true }`);
            break;
          case 'out of stock':
            filterList.push(`{ available: false }`);
            break;
          default:
            filterList.push(`{ available: true }`);
        }
      } else if (filter === 'sort by') {
        switch (filters[filter][0]) {
          case 'alphabetically, a-z':
            sortQuery = ', sortKey: TITLE';
            break;
          case 'alphabetically, z-a':
            sortQuery = ', sortKey: TITLE, reverse: true';
            break;
          case 'date, new to old':
            sortQuery = ', sortKey: CREATED';
            break;
          case 'date, old to new':
            sortQuery = ', sortKey: CREATED, reverse: true';
            break;
          case 'price, low to high':
            sortQuery = ', sortKey: PRICE';
            break;
          case 'price, high to low':
            sortQuery = ', sortKey: PRICE, reverse: true';
            break;
          case 'best selling':
            sortQuery = ', sortKey: BEST_SELLING';
            break;
          default:
            sortQuery = '';
        }
      } else
        filters[filter].forEach((tag) =>
          filterList.push(`{ tag: "${filter}:${tag}" }`)
        );
    }
  }
  let filterQuery = '';
  if (filterList.length > 0)
    filterQuery = `, filters: [${filterList.join(', ')}]`;

  let pageQuery = pageChange >= 0 ? `first: 9` : `last: 9`;
  if (pageChange === 1) pageQuery += `, after: "${cursor}"`;
  else if (pageChange === -1) pageQuery += `, before: "${cursor}"`;
  let query = `query {
    collection(handle: "${collection}") {
      products(${pageQuery}${filterQuery}${sortQuery}) {
        nodes {
          title
          id
          handle
          variants(first: 1) {
            nodes {
              priceV2 {
                amount
                currencyCode
              }
              compareAtPriceV2 {
                currencyCode
                amount
              }
              image {
                src
                id
                altText
              }
            }
          }
          vendor
        }
        pageInfo {
          startCursor
          hasPreviousPage
          hasNextPage
          endCursor
        }
      }
    }
  }`;
  return query;
}

export async function queryApi(query) {
  return await fetch(API_ENDPOINT, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({
      query: query,
    }),
  })
    .then((response) => response.json())
    .then((data) => data.data);
}

export async function addToCart(id, quantity, sellingPlan) {
  const data = { id: Number(id), quantity: Number(quantity) };
  if (sellingPlan != null) data.selling_plan = Number(sellingPlan);
  return await fetch(window.Shopify.routes.root + 'cart/add.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      items: [data],
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch(() => {});
}

export async function updateCart(id, quantity) {
  return await fetch(window.Shopify.routes.root + 'cart/update.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ updates: { [id]: Number(quantity) } }),
  })
    .then((response) => {
      return response.json();
    })
    .catch(() => {});
}
