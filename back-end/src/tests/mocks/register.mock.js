const registerMock = {

  userMock: {
    name: "Bill da cachaca",
    email: "billbill@cachaca.com",
    password: "querocachaca"
  },

  userMock2 : {
    name: "Carlinha vodkeira",
    email: "carlinha@vodka.com",
    password: "querovodka"
  },

  userMock3: {
    name: "Playboy da jager",
    email: "playboy@jager.com",
    password: "querojager"
  },

  registerFailUser: {
    message: "Campo usuario não pode ser vazio"
  },

  registerFailUserChar: {
    message: "Campo usuario deve ter no minimo 12 caracters"
  },

  registerFailEmail: {
    message: "Campo de email não e valido"
  },

  registerFailPass: {
    message: "Campo password não pode ser vazio"
  },

  registerFailPassChar: {
    message: "Campo password deve ter no minimo 6 caracters"
  },

  registerFailUserAlrdExist: {
    message: "Usuario ja cadastrado"
  },
}

module.exports = registerMock;