// ana.js

document.addEventListener('DOMContentLoaded', () => {
  // --- Kelime ekleme kodu ---
  const input = document.getElementById('wordInput');
  const tableBody = document.querySelector('#wordTable tbody');
  const clearBtn = document.getElementById('clearBtn');
  let count = 0;

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const value = input.value.trim();
      if (!value) return;
      count++;
      const row = document.createElement('tr');
      const cellNum = document.createElement('td');
      cellNum.textContent = count;
      const cellWord = document.createElement('td');
      cellWord.textContent = value;
      row.append(cellNum, cellWord);
      tableBody.appendChild(row);
      input.value = '';
    }
  });

  clearBtn.addEventListener('click', () => {
    tableBody.innerHTML = '';
    count = 0;
  });

  // --- Cümle ekleme & Check kodu ---
  const sentenceInput = document.getElementById('sentenceInput');
  const addSentenceBtn = document.getElementById('addSentenceBtn');
  const sentenceTableBody = document.querySelector('#sentenceTable tbody');
  let sentenceCount = 0;
  const sentences = [];

  // Kelimeleri maskeler
  function maskSentence(sentence) {
    const placeholder = '_____';
    document.querySelectorAll('#wordTable tbody tr td:nth-child(2)').forEach(cell => {
      const word = cell.textContent.trim();
      if (!word) return;
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      sentence = sentence.replace(regex, placeholder);
    });
    return sentence;
  }

  // Yeni cümle ekleme işlevi
  function addSentence() {
    const text = sentenceInput.value.trim();
    if (!text) return;
    const masked = maskSentence(text);
    sentences.push(text);
    const index = sentenceCount++;
    
    const row = document.createElement('tr');
    row.dataset.index = index;

    // Sıra numarası
    const cellNum = document.createElement('td');
    cellNum.textContent = index + 1;

    // Cümle girme hücresi
    const cellSentence = document.createElement('td');
    const inputEl = document.createElement('input');
    inputEl.type = 'text';
    inputEl.className = 'sentence-input';
    inputEl.value = masked;
    cellSentence.appendChild(inputEl);

    // Butonlar hücresi
    const cellActions = document.createElement('td');
    const checkBtn = document.createElement('button');
    checkBtn.textContent = 'Check';
    checkBtn.className = 'checkBtn';
    const revealBtn = document.createElement('button');
    revealBtn.textContent = 'Correct';
    revealBtn.className = 'revealBtn';
    cellActions.append(checkBtn, revealBtn);

    row.append(cellNum, cellSentence, cellActions);
    sentenceTableBody.appendChild(row);

    sentenceInput.value = '';
    sentenceInput.focus();

    // “Check” butonu davranışı
    checkBtn.addEventListener('click', () => {
      const original = sentences[index];
      if (inputEl.value.trim() === original) {
        inputEl.classList.remove('incorrect');
        inputEl.classList.add('correct');
      } else {
        inputEl.classList.remove('correct');
        inputEl.classList.add('incorrect');
      }
    });

    // “Correct” butonu davranışı
    revealBtn.addEventListener('click', () => {
      inputEl.value = sentences[index];
      inputEl.classList.remove('correct', 'incorrect');
    });
  }

  // Olay dinleyiciler
  addSentenceBtn.addEventListener('click', addSentence);
  sentenceInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') addSentence();
  });

    // Cümle temizleme butonu
  const clearSentencesBtn = document.getElementById('clearSentencesBtn');
  clearSentencesBtn.addEventListener('click', () => {
    sentenceTableBody.innerHTML = '';
    sentences.length = 0;      // dizi sıfırla
    sentenceCount = 0;         // sayacı sıfırla
  });

});
