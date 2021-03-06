const formAddTarefa = document.querySelector('.form-add-tarefa');
const formBuscarTarefa = document.querySelector('.form-search');
const containerTarefas = document.querySelector('.tarefas-container');
let banco = buscarTarefaBD();


function resetarInput(event) {
    event.target.reset();
};

function addTarefasContainer(tarefa) {
    containerTarefas.innerHTML += `<li class="list-group-item d-flex justify-content-between align-items-center" data-tarefa="${tarefa}">
      <span>${tarefa}</span>
      <i class="far fa-trash-alt"  data-lixeira="${tarefa}"></i>
    </li>`;
};

function buscarTarefaBD() {
    const bancoString = localStorage.getItem('banco');
    const bancoObj = JSON.parse(bancoString);
    return bancoObj
};

function carregarPag() {
    if (banco === null) {
        banco = []
    } else {
        banco.forEach(({ tarefa }) => {
            addTarefasContainer(tarefa);
        });
    };
};

function adicionaTarefaBD() {
    localStorage.setItem('banco', JSON.stringify(banco));
};

function verificaCampoTarefa(tarefa) {
    if (tarefa.length) {
        banco.push({ tarefa });
        adicionaTarefaBD()
        addTarefasContainer(tarefa);
        console.log(banco);
    };
};

function filtrandoTarefas(tarefas, valorInput, encontrando) {
    return tarefas.filter((tarefa) => {
        const combinou = tarefa.textContent.toLowerCase().includes(valorInput)
        return encontrando ? combinou : !combinou;
    });
};

function procurandoTarefas(tarefas, valorInput) {
    const tarefaNaoEncontrada = filtrandoTarefas(tarefas, valorInput, false);
    const tarefaEncontrada = filtrandoTarefas(tarefas, valorInput, true);

    mostrarTarefas(tarefaNaoEncontrada, 'hidden', 'd-flex');
    ocultarTarefas(tarefaEncontrada, 'd-flex', 'hidden');
};

function mostrarTarefas(tarefaNaoEncontrada, add, remove) {
    tarefaNaoEncontrada.forEach((tarefaNaoEncontrada) => {
        tarefaNaoEncontrada.classList.remove(remove);
        tarefaNaoEncontrada.classList.add(add);
    });
};

function ocultarTarefas(tarefaEncontrada, add, remove) {
    tarefaEncontrada.forEach((tarefaEncontrada) => {
        tarefaEncontrada.classList.remove(remove);
        tarefaEncontrada.classList.add(add);
    });
};

function buscarTarefa(event) {
    const valorInput = event.target.value.toLowerCase().trim()
    const tarefas = Array.from(containerTarefas.children);

    procurandoTarefas(tarefas, valorInput);
};

function adicionarTarefa(event) {
    event.preventDefault();
    const tarefa = event.target.add.value;

    verificaCampoTarefa(tarefa);
    resetarInput(event);
};

function apagarTarefa(event) {
    const elementoClicado = event.target;
    const deletar = elementoClicado.dataset.lixeira;
    const itemLista = document.querySelector(`[data-tarefa="${deletar}"]`);
    const valorDatasetItemLista = itemLista.dataset.tarefa;

    if (deletar) {
        itemLista.remove();
        banco = banco.filter((item) => item.tarefa !== valorDatasetItemLista);
        adicionaTarefaBD()
    };
};

window.addEventListener('load', carregarPag);
formAddTarefa.addEventListener('submit', adicionarTarefa);
formBuscarTarefa.addEventListener('input', buscarTarefa);
containerTarefas.addEventListener('click', apagarTarefa);