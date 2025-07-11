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
    event.preventDefault(); //evita q a pagina seja recarregada
    let objeto = {
        id:contaID++,
        nome: form.nome.value,
        registro: form.registroConselho.value,
        telefone:form.telefone.value,
        email: form.email.value,
        unidade: form.unidade.options[form.unidade.selectedIndex].label,
        especialidade: form.especialidade.options[form.especialidade.selectedIndex].label
    }
    inserirProfissional(objeto);
    atualizarTotal(); // Atualiza o total de profs no tfoot
    excluirLinha();
    alert("Profissional cadastrado com suscesso!")
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
    const totalLinhas = tabela.querySelectorAll('tbody tr').length;
    totalDisplay.textContent = `Total de profissionais: ${totalLinhas}`;
};