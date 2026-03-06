const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const countValue = document.getElementById('count-value');

let count = 0;

// Додавання задачі
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();

  if (text !== '') {
    const li = document.createElement('li');
    // Додаємо span навколо тексту, щоб було зручно його стилізувати
    li.innerHTML = `
      <label>
        <input type="checkbox" class="complete-checkbox">
        <span class="task-text">${text}</span>
      </label>
      <button class="remove-btn">Remove</button>
    `;
    
    list.appendChild(li);
    input.value = '';
    count += 1;
    countValue.textContent = count;
  }
});

const completedList = document.getElementById('completed-list');
const activeList = document.getElementById('todo-list');

// Слухаємо зміни в обох списках (якщо їх два)
document.addEventListener('change', (e) => {
  if (e.target.classList.contains('complete-checkbox')) {
    const li = e.target.closest('li');
    const targetListRight = document.getElementById('completed-list'); // Твій список справа
    const targetListLeft = document.getElementById('todo-list');

    if (e.target.checked) {
      // Якщо TRUE (чекнуто) — кидаємо в самий верх
      targetListRight.prepend(li);
    } else {
      // Якщо FALSE (зняли галочку) — кидаємо в самий низ
      targetListLeft.prepend(li);
    }
  }
});

// Окремо залишаємо клік для видалення
list.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove-btn')) {
    const item = e.target.closest('li');
    item.remove();
    count -= 1;
    countValue.textContent = count;
  }
});
