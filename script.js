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

(function() {
  const log = (label, data = {}) => {
    fetch('/behavior-log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ label, data, timestamp: Date.now() })
    }).catch(() => {}); // fail silently
  };
  // 1. Headless detection (basic)
  if (navigator.webdriver) {
    log('headless_detected', { navigator: navigator.userAgent });
  }
  // 2. Record time to first interaction
  let firstInteractionTime = null;
  const interactionHandler = (type) => {
    if (!firstInteractionTime) {
      firstInteractionTime = Date.now() - performance.timing.navigationStart;
      log('first_interaction', { type, delayMs: firstInteractionTime });
    }
  };
  ['click', 'keydown', 'touchstart'].forEach(eventType => {
    window.addEventListener(eventType, e => interactionHandler(eventType), { once: true });
  });
  // 3. Log click details
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[id], [class], button, a, div, span');
    if (el) {
      log('click', {
        tag: el.tagName,
        id: el.id || null,
        className: el.className || null,
        path: window.location.pathname
      });
    }
  });
  // 4. Log scroll behavior
  let scrollTimeout = null;
  window.addEventListener('scroll', () => {
    if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      log('scroll_event', {
        scrollY: window.scrollY,
        path: window.location.pathname
      });
    }, 300);
  });
  // 5. Visibility change
  document.addEventListener('visibilitychange', () => {
    log('visibility_change', {
      state: document.visibilityState
    });
  });
})();
