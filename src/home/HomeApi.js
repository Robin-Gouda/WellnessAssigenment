export const fetchAllProducts = () => {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats?page=1&limit=3"
    );
    const data = await response.json();
    // console.log(data);
    resolve({ data });
  });
};

export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    // TODO: we will not hard code url
    const response = await fetch(
      "https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats/" + id
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductForHeader(id = 2) {
  return new Promise(async (resolve) => {
    // TODO: we will not hard code url
    const response = await fetch(
      "https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats/" + id
    );
    const data = await response.json();
    resolve({ data });
  });
}

export const fetchProductsByFilters = (filter, sort, pagination) => {
  let queryString = "";
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length > 0) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1];
      queryString += `${key}=${lastCategoryValue}&`;
    }
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  return new Promise(async (resolve) => {
    //todo we will  not hard-code server value
    const response = await fetch(
      "http://localhost:3002/products?" + queryString
    );
    const data = await response.json();
    const abc = await fetch("http://localhost:3002/products");
    const total = await abc.json();
    const totalItem = total.length;
    resolve({ data: { products: data, totalItem: +totalItem } });
  });
};
