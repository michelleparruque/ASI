//  MODEL
let listaProdutos = [];
let carrinho = [];

function adicionarProduto(nome, preco) {
  let produto = {
    id: listaProdutos.length + 1,
    nome: nome,
    preco: preco
  };
  listaProdutos.push(produto);
}

function adicionarAoCarrinho(id) {
  let produto = null;
  for (let i = 0; i < listaProdutos.length; i++) {
    if (listaProdutos[i].id === id) {
      produto = listaProdutos[i];
    }
  }
  if (produto !== null) {
    carrinho.push(produto);
  }
}

function calcularTotalQuantidade() {
  return carrinho.length;
}

function calcularTotalPreco() {
  let total = 0;
  for (let i = 0; i < carrinho.length; i++) {
    total = total + carrinho[i].preco;
  }
  return total;
}

function encerrarCompra() {
  carrinho = [];
}

//  VIEW
function visualizarListaProdutos() {
  let lista = document.getElementById("lista-produtos");
  lista.innerHTML = "";

  if (listaProdutos.length === 0) {
    let li = document.createElement("li");
    li.textContent = "Nenhum produto adicionado ainda.";
    li.className = "vazio";
    lista.appendChild(li);
    return;
  }

  for (let i = 0; i < listaProdutos.length; i++) {
    let produto = listaProdutos[i];

    let li = document.createElement("li");

    let span = document.createElement("span");
    span.textContent = produto.nome + " — " + produto.preco + " MT";

    let btn = document.createElement("button");
    btn.textContent = "Adicionar ao Carrinho";
    btn.setAttribute("data-id", produto.id);
    btn.addEventListener("click", function() {
      controladorAdicionarAoCarrinho(produto.id);
    });

    li.appendChild(span);
    li.appendChild(btn);
    lista.appendChild(li);
  }
}

function visualizarCarrinho() {
  let lista = document.getElementById("lista-carrinho");
  lista.innerHTML = "";

  if (carrinho.length === 0) {
    let li = document.createElement("li");
    li.textContent = "O carrinho está vazio.";
    li.className = "vazio";
    lista.appendChild(li);
  } else {
    for (let i = 0; i < carrinho.length; i++) {
      let item = carrinho[i];

      let li = document.createElement("li");
      li.textContent = item.nome + " — " + item.preco + " MT";
      lista.appendChild(li);
    }
  }

  document.getElementById("total-itens").textContent = calcularTotalItens();
  document.getElementById("total-preco").textContent = calcularTotalPreco() + " MT";
}

function mostrarErro(mensagem) {
  document.getElementById("erro-produto").textContent = mensagem;
}

function limparErro() {
  document.getElementById("erro-produto").textContent = "";
}

function limparFormulario() {
  document.getElementById("input-nome").value = "";
  document.getElementById("input-preco").value = "";
}
