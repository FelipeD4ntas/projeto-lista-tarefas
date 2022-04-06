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

function filtrandoTarefas(tarefas, valorInput, encontrando) {
    return tarefas.filter((tarefa) => {
        const combinou = tarefa.textContent.toLowerCase().includes(valorInput)
        return encontrando ? combinou : !combinou;
    });
};

function procurandoTarefas(tarefas, valorInput) {
    const encontrado = filtrandoTarefas(tarefas, valorInput, false);
    const naoEncontrado = filtrandoTarefas(tarefas, valorInput, true);

    mostrarTarefas(encontrado, 'hidden', 'd-flex');
    ocultarTarefas(naoEncontrado, 'd-flex', 'hidden');
};

function mostrarTarefas(encontrado, add, remove) {
    encontrado.forEach((encontrado) => {
        encontrado.classList.remove(remove);
        encontrado.classList.add(add);
    });
};

function ocultarTarefas(naoEncontrado, add, remove) {
    naoEncontrado.forEach((naoEncontrado) => {
        naoEncontrado.classList.remove(remove);
        naoEncontrado.classList.add(add);
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

    if (deletar) itemLista.remove();
};

formAddTarefa.addEventListener('submit', adicionarTarefa);
formBuscarTarefa.addEventListener('input', buscarTarefa);
containerTarefas.addEventListener('click', apagarTarefa);