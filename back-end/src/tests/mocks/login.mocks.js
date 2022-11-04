const loginMock = {
    email: "zebirita@email.com",
    password: "$#zebirita#$",  
};

const loginMockResult = {
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InplYmlyaXRhQGVtYWlsLmNvbSIsImlhdCI6MTY2NzI0MTU2MSwiZXhwIjoxNjY3MzI3OTYxfQ.1B3M5M8uCZA8Bbqn8ViI3GJ1PniL3p4CLDXvw6DgroM",
  role: "customer",
  name: "Cliente Zé Birita"
};

const loginFailedEmail = {
  message: "Campo email não pode ser vazio"  
}

const loginFailedPass = {
  message: "Campo password não pode ser vazio"  
}

const loginFailedUser = {
  message: "Pessoa não cadastrada"  
}

module.exports = { loginMock, loginMockResult,
  loginFailedEmail, loginFailedPass, loginFailedUser};