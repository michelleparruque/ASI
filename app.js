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
            if (itens.length === 0) {
                listaCarrinho.innerHTML = '<li>Carrinho vazio</li>';
            } else {
                listaCarrinho.innerHTML = itens.map(p => `
                    <li>${p.nome} - ${p.preco} MZN</li>
                `).join('');
            }

            totalItens.textContent = Carrinho.getQuantidade();
            totalPreco.textContent = Carrinho.getTotal().toFixed(2) + ' MZN';
        },

        limparCarrinho() {
            listaCarrinho.innerHTML = '<li>Carrinho vazio</li>';
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
        if (Carrinho.getQuantidade() === 0) {
            alert("Carrinho vazio! Adicione produtos primeiro.");
            return;
        }
        alert("Compra finalizada! Total: " + Carrinho.getTotal().toFixed(2) + " MZN");
        Carrinho.limpar();
        View.limparCarrinho();
    }

    function init() {
        carregarProdutos();
        View.renderCarrinho(Carrinho.getItens());
        
        // Botão Voltar
        const btnVoltar = document.getElementById("Voltar");
        if (btnVoltar) {
            btnVoltar.addEventListener("click", function () {
                window.location.href = "Admin.html";
            });
        }
        
        // Botão Encerrar Compra
        const btnEncerrar = document.getElementById("btnEncerrar");
        if (btnEncerrar) {
            btnEncerrar.addEventListener("click", encerrarCompra);
        }
    }

    return { init, adicionarAoCarrinho, encerrarCompra };

})();

// EXPORTA O CONTROLLER GLOBALMENTE - Esta é a linha mais importante!
window.Controller = Controller;

// Inicia a aplicação
Controller.init();