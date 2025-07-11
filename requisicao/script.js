let abrirForm = document.getElementById('add');

function adicionar(){
    form.style.display = 'flex'
    abrirForm.style.display = 'none'

}

function closeForm(){
    form.style.display = 'none'
    abrirForm.style.display = 'block'
}


function carregarProfissionais(){
     let xhr = new XMLHttpRequest();
     xhr.open('GET', 'http://my-json-server.typicode.com/juniorlimeiras/json/profissionais')
     xhr.addEventListener('readystatechange', () => {
     if(xhr.readyState == 4 && xhr.status == 200){
         let dados = JSON.parse(xhr.responseText);
         let tabela = document.querySelector('table');
         for(item of dados){
//             let linha = document.createElement('tr')
//             let id = document.createElement('td');
//             let nome = document.createElement('td');
//             let registro = document.createElement('td');
//             let telefone = document.createElement('td');
//             let email = document.createElement('td');
//             let unidade = document.createElement('td');
//             let especialidade = document.createElement('td');
//             let opcoes = document.createElement('td');

//             id.textContent = item.id;
//             nome.textContent = item.nome;
//             registro.textContent = item.registro;
//             telefone.textContent = item.telefone;
//             email.textContent = item.email;
//             unidade.textContent = item.unidade;
//             especialidade.textContent = item.especialidade;
//             opcoes.innerHTML = `<a class="edit" href="">Editar</a>|<a class="exc" href="">Excluir</a>`

//             linha.appendChild(id);
//             linha.appendChild(nome);
//             linha.appendChild(registro);
//             linha.appendChild(telefone);
//             linha.appendChild(email);
//             linha.appendChild(unidade);
//             linha.appendChild(especialidade);
//             linha.appendChild(opcoes)

//             tabela.appendChild(linha);


         }
     }
     excluirLinha()
 });
  xhr.send();

} 
carregarProfissionais();
let contaID = 1;// adicionar id
let totalDisplay = document.getElementById('totalProfissionais');//contar os id

let tabela = document.querySelector('table tbody');
let form = document.querySelector('form')
let enviar = document.getElementById('enviar');
enviar.addEventListener('click', (event) => {
    event.preventDefault(); // evita recarregar a página

    let objeto = {
        id: form.dataset.editando ? form.dataset.idOriginal : contaID++,
        nome: form.nome.value,
        registro: form.registroConselho.value,
        telefone: form.telefone.value,
        email: form.email.value,
        unidade: form.unidade.options[form.unidade.selectedIndex].label,
        especialidade: form.especialidade.options[form.especialidade.selectedIndex].label
    }

    // Verifica se está editando
    if (form.dataset.editando) {
        let index = parseInt(form.dataset.editando);
        let linha = tabela.rows[index - 1]; // índice da linha (tbody)
        let colunas = linha.querySelectorAll('td');
        colunas[0].textContent = objeto.id;
        colunas[1].textContent = objeto.nome;
        colunas[2].textContent = objeto.registro;
        colunas[3].textContent = objeto.telefone;
        colunas[4].textContent = objeto.email;
        colunas[5].textContent = objeto.unidade;
        colunas[6].textContent = objeto.especialidade;

        delete form.dataset.editando;
        delete form.dataset.idOriginal;
    } else {
        inserirProfissional(objeto);
    }

    atualizarTotal();
    excluirLinha();
    editarLinha();
    alert("Profissional cadastrado com sucesso!");
    form.reset();
    form.style.display = 'none';
    abrirForm.style.display = 'block';
});
inserirProfissional = (item) =>{

    let linha = document.createElement('tr')
            let id = document.createElement('td');
            let nome = document.createElement('td');
            let registro = document.createElement('td'); //adicona classe CSS no elemento que foi criado
            registro.classList.add('ocultar');
            let telefone = document.createElement('td');
            telefone.classList.add('ocultar');
            let email = document.createElement('td');
            email.classList.add('ocultar');
            let unidade = document.createElement('td');
            unidade.classList.add('ocultar');
            let especialidade = document.createElement('td');
            let opcoes = document.createElement('td');
            opcoes.classList.add('opcoes');

            id.textContent = item.id;
            nome.textContent = item.nome;
            registro.textContent = item.registro;
            telefone.textContent = item.telefone;
            email.textContent = item.email;
            unidade.textContent = item.unidade;
            especialidade.textContent = item.especialidade;
            opcoes.innerHTML = `<a class="edit" href="">Editar</a>|<a class="excluir" href="">Excluir</a>`

            linha.appendChild(id);
            linha.appendChild(nome);
            linha.appendChild(registro);
            linha.appendChild(telefone);
            linha.appendChild(email);
            linha.appendChild(unidade);
            linha.appendChild(especialidade);
            linha.appendChild(opcoes)

            tabela.appendChild(linha);

            form.style.display = 'none'
            add.style.display = 'block'

            
            


}

function excluirLinha() {
    
    let botoes_excluir = document.querySelectorAll('a.excluir');
    for (let botao of botoes_excluir) {
        botao.addEventListener('click', (event) => {
            event.preventDefault();
            botao.parentElement.parentElement.remove();
             
            console.log("teste");
            
        });
    }
}

const atualizarTotal = () => {
    const totalLinhas = tabela.querySelectorAll('tr').length;
    totalDisplay.textContent = `Total de profissionais: ${totalLinhas}`;
};

function editarLinha() {
    let botoes_editar = document.querySelectorAll('a.edit');

    for (let botao of botoes_editar) {
        botao.addEventListener('click', (event) => {
            event.preventDefault();

            const linha = botao.closest('tr');
            const colunas = linha.querySelectorAll('td');

            // Preenche os dados no formulário
            form.dataset.idOriginal = colunas[0].textContent;
            form.nome.value = colunas[1].textContent;
            form.registroConselho.value = colunas[2].textContent;
            form.telefone.value = colunas[3].textContent;
            form.email.value = colunas[4].textContent;

            // Preenche selects comparando com o label visível
            form.unidade.value = [...form.unidade.options].find(opt => opt.label === colunas[5].textContent)?.value;
            form.especialidade.value = [...form.especialidade.options].find(opt => opt.label === colunas[6].textContent)?.value;

            // Exibe formulário
            form.style.display = 'flex';
            abrirForm.style.display = 'none';

            // Guarda a linha a ser editada
            form.dataset.editando = linha.rowIndex;

            alert("Ao concluir a edição cique em ENVIAR.");
        });
    }
}