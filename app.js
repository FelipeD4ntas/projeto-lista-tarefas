const formAddTarefa = document.querySelector('.form-add-tarefa');
const formBuscarTarefa = document.querySelector('.form-search');
const containerTarefas = document.querySelector('.tarefas-container');

function resetarInput(event) {
    event.target.reset();
};

function verificaCampoTarefa(tarefa) {
    if (tarefa.length) {
        containerTarefas.innerHTML += `<li class="list-group-item d-flex justify-content-between align-items-center" data-tarefa="${tarefa}">
        <span>${tarefa}</span>
        <i class="far fa-trash-alt"  data-lixeira="${tarefa}"></i>
    </li>`;
    };

};


function buscarTarefa(event) {
    const valorInput = event.target.value.toLowerCase().trim()
    const tarefas = Array.from(containerTarefas.children);

    const encontrado = tarefas.filter((tarefa) => {
        return !tarefa.textContent.toLowerCase().includes(valorInput);
    });

    encontrado.forEach((encontrado) => {
        encontrado.classList.remove('d-flex');
        encontrado.classList.add('hidden')
    });

    const naoeEncontrado = tarefas.filter((tarefa) => {
        return tarefa.textContent.toLowerCase().includes(valorInput);
    });

    naoeEncontrado.forEach((naoeEncontrado) => {
        naoeEncontrado.classList.remove('hidden');
        naoeEncontrado.classList.add('d-flex')
    });
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

    if (deletar) itemLista.remove();
};

formAddTarefa.addEventListener('submit', adicionarTarefa);
formBuscarTarefa.addEventListener('input', buscarTarefa);
containerTarefas.addEventListener('click', apagarTarefa);