//  function alerta(){
//             alert("testeeeeeeeeee")
//             const para = document.createElement("p");
//             para.innerText = "This is a paragraph";
//             document.body.appendChild(para);

//         }

let btn = document.querySelector('button');
btn.onclick = () => {
    alert('Função anonima')
}

btn.addEventListener('click', exibirMensagem);
function exibirMensagem(){
    alert('evento com JS')
}
btn.addEventListener('click', titulo);
function titulo(){
    let titu = document.querySelector('h1')
    titu.innerText = "Web Academy";
    titu.style.backgroundColor = 'brown'
    titu.style.color = 'white'
    titu.style.textAlign = 'center'
}