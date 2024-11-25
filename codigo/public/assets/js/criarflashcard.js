function salvarDados(chave, dados) {
    localStorage.setItem(chave, JSON.stringify(dados));
}

function recuperarDados(chave) {
    const dados = localStorage.getItem(chave);
    return dados ? JSON.parse(dados) : null;
}

function aplicarFormatacao(tag, textareaId) {
    const textarea = document.getElementById(textareaId);
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);
    const formattedText = `<${tag}>${selectedText}</${tag}>`;
    textarea.value = text.slice(0, start) + formattedText + text.slice(end);
}

document.getElementById('negrito1').addEventListener('click', function () {
    aplicarFormatacao('b', 'flashcardContent');
});
document.getElementById('italico1').addEventListener('click', function () {
    aplicarFormatacao('i', 'flashcardContent');
});
document.getElementById('sublinhado1').addEventListener('click', function () {
    aplicarFormatacao('u', 'flashcardContent');
});
document.getElementById('titulo1_1').addEventListener('click', function () {
    aplicarFormatacao('h1', 'flashcardContent');
});
document.getElementById('titulo2_1').addEventListener('click', function () {
    aplicarFormatacao('h2', 'flashcardContent');
});

document.getElementById('negrito2').addEventListener('click', function () {
    aplicarFormatacao('b', 'flashcardContent2');
});
document.getElementById('italico2').addEventListener('click', function () {
    aplicarFormatacao('i', 'flashcardContent2');
});
document.getElementById('sublinhado2').addEventListener('click', function () {
    aplicarFormatacao('u', 'flashcardContent2');
});
document.getElementById('titulo1_2').addEventListener('click', function () {
    aplicarFormatacao('h1', 'flashcardContent2');
});
document.getElementById('titulo2_2').addEventListener('click', function () {
    aplicarFormatacao('h2', 'flashcardContent2');
});

const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebarClose = document.getElementById('sidebarClose');

sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

sidebarClose.addEventListener('click', () => {
    sidebar.classList.remove('active');
});

function atualizarDropdown() {
    const decks = recuperarDados('decks') || [];
    const dropdownMenu = document.querySelector('#deckDropdown + .dropdown-menu');
    dropdownMenu.innerHTML = '';

    decks.forEach(deck => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.className = 'dropdown-item';
        link.href = '#';
        link.textContent = deck.name;
        listItem.appendChild(link);
        dropdownMenu.appendChild(listItem);

        link.addEventListener('click', function () {
            document.getElementById('deckDropdown').textContent = this.textContent;
        });
    });
}

document.addEventListener('DOMContentLoaded', atualizarDropdown);

document.getElementById('bt-ok').addEventListener('click', function () {
    const deckSelecionado = document.getElementById('deckDropdown').textContent;
    const flashcardContent = document.getElementById('flashcardContent').value;
    const flashcardContent2 = document.getElementById('flashcardContent2').value;

    const novoFlashcard = {
        deck: deckSelecionado,
        questions: flashcardContent,
        answers: flashcardContent2
    };

    const flashcardsSalvos = recuperarDados('flashcards') || [];
    flashcardsSalvos.push(novoFlashcard);
    salvarDados('flashcards', flashcardsSalvos);

    alert('Flashcard salvo!');
});
