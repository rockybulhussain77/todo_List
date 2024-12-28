const inputText = document.getElementById('input-text')
const addTodo = document.querySelector('.add_todo');
const todoContainer = document.querySelector('.todo_container');
const container = document.querySelector('.container');


let todos = [];
let isEdit = false;
let editID = null;

// 

document.addEventListener('keydown', (e) => {

    const value = inputText.value;
    if((e.code === 'Enter') && value != '' && checkEmptyValue(value) && !isEdit) {
        const id = self.crypto.randomUUID();
        todos.push({title: value, id: id});
        inputText.value = ''
        renderTodo();
    }else if(e.code === 'Enter' && isEdit && value) {
        todos = todos.map(todo => {

            if(todo.id === editID) {
                todo.title = value;
            }
    
            return todo;
        })
        inputText.value = ''
        renderTodo();
        makeDefault();
    }

})

function checkEmptyValue(value) {

    let letters = value.split('');
    for(let i = 0; i < letters.length; i++) {
        if(letters[i] !== ' ') {
            return true;
        }
    }

    return false;
}

addTodo.addEventListener('click', addTodoList);

function addTodoList() {

    
    const value = inputText.value;
    if(value != ' ' && !isEdit && checkEmptyValue(value)) {
        const id = self.crypto.randomUUID();
        todos.push({title: value, id: id});
        renderTodo();
    }else if(isEdit && value) {
        todos = todos.map(todo => {

            if(todo.id === editID) {
                todo.title = value;
            }
    
            return todo;
        })

        renderTodo();
        makeDefault();
    }else {
        alert('Please Add something.....')
    }


    inputText.value = '';

    
}


function makeDefault() {
    isEdit = false;
    editID = null;
}



function deleteTodo(e) {

    inputText.value = ''
    let element = e.target.parentElement.parentElement;
    element.remove();
    let id = e.target.parentElement.parentElement.getAttribute('data-id');

    todos = todos.filter(todo => todo.id !== id);
    renderTodo();
    makeDefault();
}

function editTodo(e) {
    isEdit = true;
    value = e.target.parentElement.previousElementSibling.textContent;
    editID = e.target.parentElement.parentElement.getAttribute('data-id');
    inputText.value = value;

}

function renderTodo() {

   const allTodoItems = todos.map(todo => {
      return ` 
            <div class="todo" data-id="${todo.id}">
                <div class="title">${todo.title}</div>
                <div class="btns_container">
                    <button class="edit_btn">edit</button>
                    <button class="delete_btn">delete</button>
                </div>
            </div>
      `;
    })

    todoContainer.innerHTML = allTodoItems.join('');
    const editBtns = document.querySelectorAll('.edit_btn');
    const deleteBtns = document.querySelectorAll('.delete_btn');
    deleteBtns.forEach(deleteBtn => {
        deleteBtn.addEventListener('click', deleteTodo);
    })
    editBtns.forEach(editBtn => {
        editBtn.addEventListener('click', editTodo);
    })
}


