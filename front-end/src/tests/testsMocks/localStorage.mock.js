const localStorageMock = {
  email: 'zebirita@email.com',
  id: 3,
  name: 'Cliente Zé Birita',
  role: 'customer',
  token: 'superlongtoken',
};

const localStorageAdmin = {
  email: 'adm@deliveryapp.com',
  id: 1,
  name: 'Delivery App Admin',
  role: 'administrator',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbUBkZWxpdmVyeWFwcC5'
   + 'jb20iLCJpYXQiOjE2NjgxNzMwNTYsImV4cCI6MTY2ODI1OTQ1Nn0.'
   + 'iutuuWzvKIwhTT-9R-OS8oU0_y0Z-Ma6NprJpq0kngY',
};

const localStorageSeller = {
  email: 'fulana@deliveryapp.com',
  id: 2,
  name: 'Fulana pereira',
  role: 'seller',
  token: 'superlongtoken',
};

// const localStorage = {
//   setItem: (key, val) => Object.assign(localStorageMock, {
//     [key]: val,
//   }),
//   getItem: (key) => localStorageMock[key],
//   clear: () => localStorageMock = {},
// };

// const localStorageMock = {
//   getItem: jest.fn(),
//   setItem: jest.fn(),
//   clear: jest.fn(),
// };

module.exports = { localStorageMock, localStorageAdmin, localStorageSeller };
