//Model
            const Model=(() => {
                const KEY='shopcart_produtos';

                function load(){
                    return JSON.parse(localStorage.getItem(KEY)||'[]');
                }
                function save(produtos){
                    localStorage.setItem(KEY, JSON.stringify(produtos))
                }
                return{
                    getAll(){
                        return load();
                    },

                    add(nome,preco){
                        const produtos=load();
                        const produto={id: Date.now(), nome, preco};
                        produtos.push(produto);
                        save(produtos);
                        return produto;
                    },

                    remove(nome){
                        const produtos=load().filter(p=>
                            p.nome.toLowerCase() !==nome.toLowerCase()
                        );
                        save(produtos);
                    },

                    getCount(){
                        return load().length;
                    }
                };


            })();


//View
            const View=(()=>{
                const inputNomeProduto=document.getElementById('nomeProduto');
                const inputPreco=document.getElementById('precoProduto');
                const inputNomeRemover=document.getElementById('nomeRemover');
                const btnAdd=document.getElementById('btnAdd');
                const btnRem=document.getElementById('btnRem');
                const listaProdutos=document.getElementById('listaProdutos');
                const countSpan=document.getElementById('totalProdutos');

                return{
                    getNomeProduto(){return inputNomeProduto.value.trim();},
                    getPreco(){return parseFloat(inputPreco.value);},
                    getNomeRemover(){return inputNomeRemover.value.trim();},

                    clearFormAdd(){
                        inputNomeProduto.value='';
                        inputPreco.value='';
                        inputNomeProduto.focus();
                    },

                    clearFormRemove(){
                        inputNomeRemover.value='';
                        inputNomeRemover.focus();
                    },

                    renderProdutos(produtos){
                        countSpan.textContent=produtos.length;

                        if(produtos.length===0){
                            listaProdutos.innerHTML='<div class="empty-state">Nenhum produto registado.</div>';
                            return;
                        }

                        listaProdutos.innerHTML=produtos.map(p =>`
                            <div style="
                                background: lavender;
                                border-radius: 8px;
                                padding: 8px 12px;
                                margin-top: 8px;
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                            ">
                                <span><strong>${p.nome}</strong></span>
                                <span style="color: plum; font-weight: bold;">
                                    MT ${p.preco.toFixed(2).replace('.', ',')}
                                </span>
                            </div>

                        `).join('');
                    },

                    showMessage(msg, tipo='sucesso'){
                        const cor=tipo==='erro'?'#d94f4f':'#4a9d7a';
                        const div=document.createElement('div');
                        div.textContent = msg;
                        div.style.cssText = `
                            position: fixed; top: 80px; left:40%;
                            background: ${cor}; color: white;
                            padding: 10px 18px; border-radius: 8px;
                            font-size: 0.88rem; font-weight: 600;
                            z-index: 999; opacity: 1;
                            transition: opacity 0.4s ease;
                        `;
                        document.body.appendChild(div);
                        setTimeout(() => {
                            div.style.opacity = '0';
                            setTimeout(() => div.remove(), 400);
                        }, 2500);
                    },
                    bindAdicionar(fn) { btnAdd.addEventListener('click', fn); },
                    bindRemover(fn)   { btnRem.addEventListener('click', fn); }

                };

            })();

//Controller

            const Controller=(()=>{
               function refresh(){
                    View.renderProdutos(Model.getAll());
               } 
               function handleAdicionar(){
                    const nome=View.getNomeProduto();
                    const preco=View.getPreco();

                    if (!nome)                      return View.showMessage('Insira o nome do produto.', 'erro');
                    if (isNaN(preco) || preco <= 0) return View.showMessage('Insira um valor válido.', 'erro');

                    Model.add(nome, preco);
                    View.clearFormAdd();
                    View.showMessage(`"${nome}" adicionado com sucesso!`);
                    refresh();
                }
                function handleRemover() {
                    const nome = View.getNomeRemover();

                    if (!nome) return View.showMessage('Escreva o nome do produto a remover.', 'erro');

                    const existe = Model.getAll().find(p =>
                        p.nome.toLowerCase() === nome.toLowerCase()
                    );

                    if (!existe) return View.showMessage(`"${nome}" não encontrado.`, 'erro');

                    Model.remove(nome);
                    View.clearFormRemove();
                    View.showMessage(`"${nome}" removido!`, 'erro');
                    refresh();
                }
               
                function init(){
                    View.bindAdicionar(handleAdicionar);
                    View.bindRemover(handleRemover);
                    refresh();
        
                }

                return{init};



            })();

            Controller.init();
            document.getElementById("Voltar").addEventListener("click", function () {window.location.href = "index.html";});

       

            
   