
let times = ["flu", "fla", "rb"];

// for (let j = 0; j <times.length; j++){
//     console.log(times[j])
// }
// for (time of times)
// console.log(time);

let estado = new Object();
estado = {
    nome: "Acre",
    populacao: 906876,
    capital:{
        nome: "Rio branco",
        populacao: 400000
    },
    indicadores: function(){
        alert(`a capital do ${this.nome} é ${this.capital.nome} e tem ${this.capital.populacao} habitantes`);
    }

}
// console.log(`a capital do ${estado.nome} é ${estado.capital.nome} e tem ${estado.capital.populacao} habitantes`);
alert(estado.indicadores())



