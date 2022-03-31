const formAddTarefa = document.querySelector('.form-add-todo');
const inputSearch = document.querySelector('.form-search input');
const containerTarefas = document.querySelector('.todos-container');


function resetarInput(event) {
    event.target.reset();
};


function verificaInputPreenchido(tarefa) {
    if (tarefa.length) {
        containerTarefas.innerHTML += `
        <li class="list-group-item d-flex justify-content-between align-items-center" data-tarefa="${tarefa}">
            <span>${tarefa}</span>
            <i class="far fa-trash-alt" data-trash="${tarefa}"></i>
        </li>
      `
    };

    
};

function filterTarefas(tarefas, inputValue, returnTarefas) {
    return tarefas
        .filter(tarefa => {
            const matchedTarefas = tarefa.textContent.toLowerCase().includes(inputValue)
            return returnTarefas ? matchedTarefas : !matchedTarefas;
        });
};

function addClasses(tarefas, classAdd, classRemove) {
    tarefas.forEach(tarefa => {
        tarefa.classList.remove(classRemove);
        tarefa.classList.add(classAdd);
    });
};

function hideTarefas(tarefas, inputValue) {
    const tarefasToHide = filterTarefas(tarefas, inputValue, false);
    addClasses(tarefasToHide, 'hidden' , 'd-flex');   
};

function showTarefas(tarefas, inputValue) {
    const tarefasToShow = filterTarefas(tarefas, inputValue, true);
    addClasses(tarefasToShow, 'd-flex', 'hidden');   
};

function adicionarTarefa(event) {
    event.preventDefault();
    const tarefa = event.target.add.value.trim();

    verificaInputPreenchido(tarefa);

    resetarInput(event);
};

function buscarTarefa(event) {
    const inputValue = event.target.value.trim().toLowerCase();
    const tarefas = Array.from(containerTarefas.children);

    hideTarefas(tarefas, inputValue);
    showTarefas(tarefas, inputValue);
};

function apagarTarefa(event) {
    const elementoClicado = event.target;
    const deletar = elementoClicado.dataset.trash;
    const itemLista = document.querySelector(`[data-tarefa="${deletar}"]`);

    if (deletar) {
       itemLista.remove();
    };

};

formAddTarefa.addEventListener('submit', adicionarTarefa);
inputSearch.addEventListener('input', buscarTarefa);
containerTarefas.addEventListener('click', apagarTarefa);