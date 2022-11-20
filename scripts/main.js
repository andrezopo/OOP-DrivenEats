class Pedido {
  constructor(prato, bebida, sobremesa) {
    this.prato = prato;
    this.bebida = bebida;
    this.sobremesa = sobremesa;
  }

  setPratoSelecionado(prato) {
    this.prato = prato;
  }
  setBebidaSelecionada(bebida) {
    this.bebida = bebida;
  }
  setSobremesaSelecionada(sobremesa) {
    this.sobremesa = sobremesa;
  }

  verificarEstado() {
    if (this.prato && this.bebida && this.sobremesa) {
      btnPedir.classList.add("ativo");
      btnPedir.disabled = false;
      btnPedir.innerHTML = "Fazer pedido";
    }
  }

  getPrecoTotal() {
    return this.prato.preco + this.bebida.preco + this.sobremesa.preco;
  }

  confirmarEscolhas() {
    const modal = document.querySelector(".overlay");
    modal.classList.remove("escondido");

    document.querySelector(".confirmar-pedido .prato .nome").innerHTML =
      this.prato.nome;
    document.querySelector(".confirmar-pedido .prato .preco").innerHTML =
      this.prato.preco.toFixed(2);

    document.querySelector(".confirmar-pedido .bebida .nome").innerHTML =
      this.bebida.nome;
    document.querySelector(".confirmar-pedido .bebida .preco").innerHTML =
      this.bebida.preco.toFixed(2);

    document.querySelector(".confirmar-pedido .sobremesa .nome").innerHTML =
      this.sobremesa.nome;
    document.querySelector(".confirmar-pedido .sobremesa .preco").innerHTML =
      this.sobremesa.preco.toFixed(2);

    document.querySelector(".confirmar-pedido .total .preco").innerHTML =
      this.getPrecoTotal().toFixed(2);
  }

  cancelarEscolhas() {
    const modal = document.querySelector(".overlay");
    modal.classList.add("escondido");
  }

  enviarZap() {
    const telefoneRestaurante = 553299999999;
    const encodedText = encodeURIComponent(
      `Olá, gostaria de fazer o pedido: \n- Prato: ${
        this.prato.nome
      } \n- Bebida: ${this.bebida.nome} \n- Sobremesa: ${
        this.sobremesa.nome
      } \nTotal: R$ ${this.getPrecoTotal().toFixed(2)}`
    );

    const urlWhatsapp = `https://wa.me/${telefoneRestaurante}?text=${encodedText}`;
    window.open(urlWhatsapp);
  }
}

const pedido = new Pedido(null, null, null);

const btnConfirmar = document.querySelector(".confirmar");
const btnCancelar = document.querySelector(".cancelar");
const btnPedir = document.querySelector(".fazer-pedido");

class Prato {
  constructor(nome, imagem, descricao, preco) {
    this.nome = nome;
    this.imagem = imagem;
    this.descricao = descricao;
    this.preco = preco;
  }

  serSelecionado(elemento) {
    const selecionado = document.querySelector(".prato .selecionado");
    if (selecionado !== null) {
      selecionado.classList.remove("selecionado");
    }
    elemento.classList.add("selecionado");

    pedido.setPratoSelecionado({ nome: this.nome, preco: this.preco });
    pedido.verificarEstado();
  }

  getIntoView() {
    const view = document.createElement("div");
    view.classList.add("opcao");
    view.addEventListener("click", () => {
      this.serSelecionado(view);
    });
    view.innerHTML = `
          <img src="${this.imagem}" />
          <div class="titulo">${this.nome}</div>
          <div class="descricao">${this.descricao}</div>
          <div class="fundo">
              <div class="preco">R$ ${this.preco.toFixed(2)}</div>
              <div class="check">
                  <ion-icon name="checkmark-circle"></ion-icon>
              </div>
          </div>
      `;

    return view;
  }
}

class Bebida {
  constructor(nome, imagem, descricao, preco) {
    this.nome = nome;
    this.imagem = imagem;
    this.descricao = descricao;
    this.preco = preco;
  }

  serSelecionada(elemento) {
    const selecionado = document.querySelector(".bebida .selecionado");
    if (selecionado !== null) {
      selecionado.classList.remove("selecionado");
    }
    elemento.classList.add("selecionado");

    pedido.setBebidaSelecionada({ nome: this.nome, preco: this.preco });
    pedido.verificarEstado();
  }

  getIntoView() {
    const view = document.createElement("div");
    view.classList.add("opcao");
    view.addEventListener("click", () => {
      this.serSelecionada(view);
    });
    view.innerHTML = `
          <img src="${this.imagem}" />
          <div class="titulo">${this.nome}</div>
          <div class="descricao">${this.descricao}</div>
          <div class="fundo">
              <div class="preco">R$ ${this.preco.toFixed(2)}</div>
              <div class="check">
                  <ion-icon name="checkmark-circle"></ion-icon>
              </div>
          </div>
      `;

    return view;
  }
}

class Sobremesa {
  constructor(nome, imagem, descricao, preco) {
    this.nome = nome;
    this.imagem = imagem;
    this.descricao = descricao;
    this.preco = preco;
  }

  serSelecionada(elemento) {
    const selecionado = document.querySelector(".sobremesa .selecionado");
    if (selecionado !== null) {
      selecionado.classList.remove("selecionado");
    }
    elemento.classList.add("selecionado");

    pedido.setSobremesaSelecionada({ nome: this.nome, preco: this.preco });
    pedido.verificarEstado();
  }

  getIntoView() {
    const view = document.createElement("div");
    view.classList.add("opcao");
    view.addEventListener("click", () => {
      this.serSelecionada(view);
    });
    view.innerHTML = `
          <img src="${this.imagem}" />
          <div class="titulo">${this.nome}</div>
          <div class="descricao">${this.descricao}</div>
          <div class="fundo">
              <div class="preco">R$ ${this.preco.toFixed(2)}</div>
              <div class="check">
                  <ion-icon name="checkmark-circle"></ion-icon>
              </div>
          </div>
      `;

    return view;
  }
}

const pratos = [
  new Prato(
    "Estrombelete de Frango",
    "img/frango_yin_yang.png",
    "Um pouco de batata, um pouco de salada",
    14.9
  ),
  new Prato("Asa de Boi", "img/frango_yin_yang.png", "Com molho shoyu", 14.7),
  new Prato(
    "Carne de Monstro",
    "img/frango_yin_yang.png",
    "Com batata assada e farofa",
    14.8
  ),
];

const bebidas = [
  new Bebida("Coquinha gelada", "img/coquinha_gelada.png", "Lata 350ml", 4.9),
  new Bebida("Caldo de Cana", "img/coquinha_gelada.png", "Copo 600ml", 4.5),
  new Bebida("Corote Gelado", "img/coquinha_gelada.png", "Garrafa 400ml", 2.9),
];

const sobremesas = [
  new Sobremesa("Pudim", "img/pudim.png", "Gosto de doce de leite", 7.9),
  new Sobremesa("Flam", "img/pudim.png", "Gosto de chocolate", 7.6),
  new Sobremesa("Brigadeiro", "img/pudim.png", "3 unidades", 7.2),
];

function cancelarPedido() {
  const modal = document.querySelector(".overlay");
  modal.classList.add("escondido");
}

const pratosContainer = document.querySelector(".opcoes.prato");
pratos.forEach((prato) => pratosContainer.appendChild(prato.getIntoView()));
const bebidasContainer = document.querySelector(".opcoes.bebida");
bebidas.forEach((bebida) => bebidasContainer.appendChild(bebida.getIntoView()));
const sobremesasContainer = document.querySelector(".opcoes.sobremesa");
sobremesas.forEach((sobremesa) =>
  sobremesasContainer.appendChild(sobremesa.getIntoView())
);

btnConfirmar.addEventListener("click", () => {
  pedido.enviarZap();
});

btnCancelar.addEventListener("click", () => {
  pedido.cancelarEscolhas();
});

btnPedir.addEventListener("click", () => {
  pedido.confirmarEscolhas();
});
