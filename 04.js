function getHournsMinutos(segundos){
    const data = new Date(segundos * 1000);
    return data.toLocaleTimeString('pt-BR' ,{ 
    hour12:false,
     timeZone:'GMT'}
    
    )};
 

console.log(getHournsMinutos(10))


const relogio = document.querySelector('.relogio');
const iniciar = document.querySelector('.iniciar');
const pausar = document.querySelector('.pausar');
const zerar = document.querySelector('.zerar');

let segundos = 0;
let timer;

function Criarsegundos (){
     timer = setInterval(function(){
        segundos++;
        relogio.innerHTML = getHournsMinutos( segundos);
    }, 1000);
}
    function Pararrelogio(){}

iniciar.addEventListener('click' , function(event){clearInterval(timer)   ;Criarsegundos();})
zerar.addEventListener('click' , function(){clearInterval(timer); relogio.innerHTML = '00:00:00' })
pausar.addEventListener('click' , function(){clearInterval(timer);})

//inicialndo as tarefas 

let inputNovaTarefa = document.querySelector('#inputNovaTarefa');
let btnAddTarefa = document.querySelector('#btnAddTarefa');
let listaTarefas = document.querySelector('#listaTarefas');
let janelaEdicao = document.querySelector('#janelaEdicao');
let janelaEdicaoFundo = document.querySelector('#janelaEdicaoFundo');
let janelaEdicaoBtnFechar = document.querySelector('#janelaEdicaoBtnFechar');
let btnAtualizarTarefa = document.querySelector('#btnAtualizarTarefa');
//let idTarefaEdicao = document.querySelector('#idTarefaEdicao');
//let inputTarefaNomeEdicao = document.querySelector('#inputTarefaNomeEdicao');
const qtdIdsDisponiveis = Number.MAX_VALUE;

inputNovaTarefa.addEventListener('keypress', (e) => {

    if(e.keyCode == 13) {
        let tarefa = {
            nome: inputNovaTarefa.value,
            id: gerarIdV2(),
        }
        adicionarTarefa(tarefa);
    }
});



    
btnAddTarefa.addEventListener('click', (e) => {

    let tarefa = {
        nome: inputNovaTarefa.value,
        id: gerarIdV2(),
    }
    adicionarTarefa(tarefa);
});

btnAtualizarTarefa.addEventListener('click', (e) => {
    e.preventDefault();

    let idTarefa = idTarefaEdicao.innerHTML.replace('#', '');

    let tarefa = {
        nome: inputTarefaNomeEdicao.value,
        id: idTarefa
    }

    let tarefaAtual = document.getElementById(''+idTarefa+'');

    if(tarefaAtual) {
        let li = criarTagLI(tarefa);
        listaTarefas.replaceChild(li, tarefaAtual);
        alternarJanelaEdicao();
    } else {
        alert('Elemento HTML não encontrado!');
    } 
});

function gerarId() {
    return Math.floor(Math.random() * qtdIdsDisponiveis);
}

function gerarIdV2() {
    return gerarIdUnico();
}

function gerarIdUnico() {

    // debugger;
    let itensDaLista = document.querySelector('#listaTarefas').children;
    let idsGerados = [];

    for(let i=0;i<itensDaLista.length;i++) {
        idsGerados.push(itensDaLista[i].id);
    }

    let contadorIds = 0;
    let id = gerarId();

    while(contadorIds <= qtdIdsDisponiveis && 
        idsGerados.indexOf(id.toString()) > -1) {
            id = gerarId();
            contadorIds++;

            if(contadorIds >= qtdIdsDisponiveis) {
                alert("Oops, ficamos sem IDS :/");
                throw new Error("Acabou os IDs :/");
            }
        }

    return id;
}

function adicionarTarefa(tarefa) {
    let li = criarTagLI(tarefa);
    listaTarefas.appendChild(li);  
    inputNovaTarefa.value = '';  
}

function criarTagLI(tarefa) {

    let li = document.createElement('li');
    li.id = tarefa.id;

    let  span  = document.createElement('span');
    span.classList.add('textoTarefa');
    span.innerHTML = tarefa.nome;

    let div  = document.createElement('div');

   
    
    let btnExcluir  = document.createElement('button');
    btnExcluir.classList.add('btnAcao');
    btnExcluir.innerHTML = '<i class="fa fa-trash"></i>';
    btnExcluir.setAttribute('onclick', 'excluir('+tarefa.id+')');

   
    div.appendChild(btnExcluir);

    li.appendChild(span);
    li.appendChild(div);
    return li;
}



function excluir(idTarefa) {
    let confirmacao = window.confirm('Tem certeza que deseja excluir? ');
    if(confirmacao) {
        let li = document.getElementById(''+ idTarefa + '');
        if(li) {
            listaTarefas.removeChild(li);
        } else {
            alert('Elemento HTML não encontrado!');
        }
    }
}


