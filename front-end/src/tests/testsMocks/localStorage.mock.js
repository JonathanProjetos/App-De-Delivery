const localStorageMock = {
  email: 'zebirita@email.com',
  id: 3,
  name: 'Cliente Zé Birita',
  role: 'customer',
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

module.exports = localStorageMock;
