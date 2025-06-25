function login() {
    const username = document.getElementById('username');
    const password = document.getElementById('password');

    if (username === '' || password === '') {
        alert('Please enter both username and password');
        return;
    }

    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('todoSection').style.display = 'block';
}

function addTask() {
    const input = document.getElementById('taskInput');
    const taskText = input.value;

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

let attemptCount = 0;
let isMoving = false;

function getRandomPosition() {
    const movingBtn = document.getElementById('movingBtn');
    if (!movingBtn) return { x: 0, y: 0 };
    
    const margin = 100;
    const maxX = window.innerWidth - movingBtn.offsetWidth - margin;
    const maxY = window.innerHeight - movingBtn.offsetHeight - margin;
    
    return {
        x: Math.random() * (maxX - margin) + margin,
        y: Math.random() * (maxY - margin) + margin
    };
}

function moveButton() {
    if (isMoving) return;
    
    const movingBtn = document.getElementById('movingBtn');
    const message = document.getElementById('message');
    
    if (!movingBtn) return;
    
    isMoving = true;
    attemptCount++;
    
    const pos = getRandomPosition();
    
    movingBtn.classList.add('moving');
    movingBtn.style.left = pos.x + 'px';
    movingBtn.style.top = pos.y + 'px';
    
    const messages = [
        "Oops!",,
        "Nice try!",
        "Keep trying!",
    ];
    
    if (message) {
        message.textContent = messages[Math.min(attemptCount - 1, messages.length - 1)];
    }
    
    setTimeout(() => {
        isMoving = false;
    }, 300);
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


const movingBtn = document.getElementById('movingBtn');
    if (movingBtn) {
        movingBtn.addEventListener('mouseenter', moveButton);

        // Reset button position when clicking elsewhere
        document.addEventListener('click', (e) => {
            if (e.target !== movingBtn && movingBtn.classList.contains('moving')) {
                setTimeout(() => {
                    movingBtn.classList.remove('moving');
                    movingBtn.style.left = '';
                    movingBtn.style.top = '';
                    const message = document.getElementById('message');
                    if (message) {
                        message.textContent = '';
                    }
                    attemptCount = 0;
                }, 2000);
            }
        });

        // Prevent clicking when moving
        movingBtn.addEventListener('click', (e) => {
            const message = document.getElementById('message');
            if (movingBtn.classList.contains('moving')) {
                e.preventDefault();
                if (message) {
                    message.textContent = "You can't click me while I'm moving!";
                }
            } else {
                if (message) {
                    message.textContent = "You managed to click me!";
                }
            }
        });
    };
});

const aboutBtn = document.getElementById("aboutBtn");
aboutBtn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
        window.location.href = "https://amazon.com";
    }
});

aboutBtn.addEventListener("click", () => {
    window.location.href = "https://amazon.com";
});

// dynamic positoning of the invisible overlay button
  window.addEventListener("DOMContentLoaded", () => {
    const targetBtn = document.getElementById("aboutBtn");
    const overlayBtn = document.getElementById("overlayBtn");
    const rect = targetBtn.getBoundingClientRect();

    overlayBtn.style.position = "absolute";
    overlayBtn.style.top = `${rect.top + window.scrollY}px`;
    overlayBtn.style.left = `${rect.left + window.scrollX}px`;
    overlayBtn.style.width = `${rect.width}px`;
    overlayBtn.style.height = `${rect.height}px`;
    overlayBtn.style.opacity = "0";
    overlayBtn.style.zIndex = "9999";
    overlayBtn.style.cursor = "pointer";
  });
