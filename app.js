const Model = (() => {
    const KEY = 'shopcart_produtos';

    function loadProdutos() {
        return JSON.parse(localStorage.getItem(KEY) || '[]');
    }

    return {
        getProdutos() {
            return loadProdutos();
        }
    };
})();

const Carrinho = (() => {
    let itens = [];

    return {
        adicionar(produto) {
            itens.push(produto);
        },

        getItens() {
            return itens;
        },

        getTotal() {
            return itens.reduce((total, p) => total + p.preco, 0);
        },

        getQuantidade() {
            return itens.length;
        },

        limpar() {
            itens = [];
        }
    };
})();

// VIEW
const View = (() => {
    const listaProdutos = document.getElementById('lista-produtos');
    const listaCarrinho = document.getElementById('lista-carrinho');
    const totalItens = document.getElementById('totalItens');
    const totalPreco = document.getElementById('totalPreco');

    return {
        renderProdutos(produtos) {
            if (produtos.length === 0) {
                listaProdutos.innerHTML = '<li>Nenhum produto disponível</li>';
                return;
            }

            listaProdutos.innerHTML = produtos.map(p => `
                <li>
                    ${p.nome} - ${p.preco} MZN
                    <button onclick="Controller.adicionarAoCarrinho(${p.id})">
                        Adicionar
                    </button>
                </li>
            `).join('');
        },

        renderCarrinho(itens) {
            listaCarrinho.innerHTML = itens.map(p => `
                <li>${p.nome} - ${p.preco} MZN</li>
            `).join('');

            totalItens.textContent = Carrinho.getQuantidade();
            totalPreco.textContent = Carrinho.getTotal().toFixed(2) + ' MZN';
        },

        limparCarrinho() {
            listaCarrinho.innerHTML = '';
            totalItens.textContent = 0;
            totalPreco.textContent = '0.00 MZN';
        }
    };
})();

// CONTROLLER
const Controller = (() => {

    function carregarProdutos() {
        const produtos = Model.getProdutos();
        View.renderProdutos(produtos);
    }

    function adicionarAoCarrinho(id) {
        const produtos = Model.getProdutos();
        const produto = produtos.find(p => p.id === id);

        if (!produto) return;

        Carrinho.adicionar(produto);
        View.renderCarrinho(Carrinho.getItens());
    }

    function encerrarCompra() {
        alert("Compra finalizada!");
        Carrinho.limpar();
        View.limparCarrinho();
    }

    function init() {
        carregarProdutos();

        window.Controller = {
            adicionarAoCarrinho,
            encerrarCompra
        };
    }

    return { init };

})();

Controller.init();
document.getElementById("Voltar").addEventListener("click", function () {window.location.href = "Admin.html";});