function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (username === '' || password === '') {
        alert('Please enter both username and password');
        return;
    }

    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('todoSection').style.display = 'block';
}

function addTask() {
    const input = document.getElementById('taskInput');
    const taskText = input.value.trim();

    if (taskText === '') return;

    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');

    li.innerHTML = `
        <span>${taskText}</span>
        <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
    `;

    taskList.appendChild(li);
    input.value = '';
}

function deleteTask(button) {
    button.parentElement.remove();
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('taskInput').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    document.getElementById('username').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            login();
        }
    });

    document.getElementById('password').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            login();
        }
    });
});
