const formAddTarefa = document.querySelector('.form-add-tarefa');
const containerTarefas = document.querySelector('.tarefas-container');

function adicionarTarefa(event) {
    event.preventDefault();
    const tarefa = event.target.add.value;

    if (tarefa.length) {
        containerTarefas.innerHTML += `<li class="list-group-item d-flex justify-content-between align-items-center" data-tarefa="${tarefa}">
            <span>${tarefa}</span>
            <i class="far fa-trash-alt"  data-lixeira="${tarefa}"></i>
        </li>`;
    };
    
    event.target.reset();
};

formAddTarefa.addEventListener('submit', adicionarTarefa);