let startDate = null;
let goalDate = null;
let timer = null;

// ===== ELEMENTOS =====
const namesInput = document.getElementById('namesInput');
const startDateInput = document.getElementById('startDate');
const enableGoal = document.getElementById('enableGoal');
const goalDateInput = document.getElementById('goalDate');
const backgroundInput = document.getElementById('backgroundInput');

const coupleNames = document.getElementById('coupleNames');
const relationshipTime = document.getElementById('relationshipTime');
const goalTime = document.getElementById('goalTime');
const goalBox = document.getElementById('goalBox');
const goalLabel = document.getElementById('goalLabel');

// ===== META =====
if (enableGoal) {
  enableGoal.addEventListener('change', () => {
    const enabled = enableGoal.checked;
    toggleGoal(enabled);
    saveData();
  });
}

function toggleGoal(enabled) {
  goalBox.classList.toggle('hidden', !enabled);
  goalDateInput.classList.toggle('hidden', !enabled);
  goalLabel.classList.toggle('hidden', !enabled);
}

// ===== IMAGEM =====
backgroundInput.addEventListener('change', function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = e => {
    document.body.style.backgroundImage = `url('${e.target.result}')`;
    localStorage.setItem('backgroundImage', e.target.result);
  };
  reader.readAsDataURL(file);
});

// ===== SALVAR / INICIAR =====
function startCounter() {
  const names = namesInput.value.trim();
  const startValue = startDateInput.value;

  if (!startValue) {
    alert('Informe a data de início do relacionamento');
    return;
  }

  startDate = new Date(startValue + 'T00:00:00');

  if (names) {
    coupleNames.innerText = names;
    coupleNames.classList.remove('hidden');
  }

  if (goalDateInput && goalDateInput.value) {
    goalDate = new Date(goalDateInput.value + 'T00:00:00');
  } else {
    goalDate = null;
  }

  saveData();

  if (!timer) {
    timer = setInterval(updateCounters, 1000);
  }

  updateCounters();
}

// ===== CONTADORES =====
function updateCounters() {
  const now = new Date();

  if (startDate) {
    const diff = dateDiff(startDate, now);
    relationshipTime.innerText =
      `${diff.years} anos, ${diff.months} meses, ${diff.days} dias, ` +
      `${diff.hours}h ${diff.minutes}m ${diff.seconds}s`;
  }

  if (goalDate) {
    const diff = dateDiff(now, goalDate);
    goalTime.innerText =
      diff.totalSeconds > 0
        ? `${diff.years} anos, ${diff.months} meses, ${diff.days} dias, ` +
          `${diff.hours}h ${diff.minutes}m ${diff.seconds}s`
        : 'Meta alcançada 🎉';
  }
}

// ===== DIFERENÇA DE TEMPO =====
function dateDiff(start, end) {
  let delta = Math.floor((end - start) / 1000);
  delta = Math.abs(delta);

  return {
    seconds: delta % 60,
    minutes: Math.floor(delta / 60) % 60,
    hours: Math.floor(delta / 3600) % 24,
    days: Math.floor(delta / 86400) % 30,
    months: Math.floor(delta / (86400 * 30)) % 12,
    years: Math.floor(delta / (86400 * 365)),
    totalSeconds: end - start
  };
}

// ===== LOCAL STORAGE =====
function saveData() {
  localStorage.setItem('names', namesInput.value);
  localStorage.setItem('startDate', startDateInput.value);
  const enableGoalValue = enableGoal ? enableGoal.checked : !!goalDate;
  localStorage.setItem('enableGoal', enableGoalValue);
  let goalDateValue = '';
  if (goalDateInput && goalDateInput.value) goalDateValue = goalDateInput.value;
  else if (goalDate instanceof Date) goalDateValue = goalDate.toISOString().slice(0, 10);
  localStorage.setItem('goalDate', goalDateValue);
}

function loadData() {
  const names = localStorage.getItem('names');
  const start = localStorage.getItem('startDate');
  const goalEnabled = localStorage.getItem('enableGoal') === 'true';
  const goal = localStorage.getItem('goalDate');
  const bg = localStorage.getItem('backgroundImage');

  const goalTitle = localStorage.getItem('goalTitle');
  localStorage.getItem('goalDate');
  const goalDateValue = localStorage.getItem('goalDate');
  if (goalTitle && goalDateValue) {
    goalDate = new Date(goalDateValue + 'T00:00:00');
    goalBox.classList.remove('hidden');
    goalLabel.innerText = goalTitle;
  }

  if (bg) document.body.style.backgroundImage = `url('${bg}')`;

  if (names) {
    namesInput.value = names;
    coupleNames.innerText = names;
    coupleNames.classList.remove('hidden');
  }

  if (start) {
    startDateInput.value = start;
    startDate = new Date(start + 'T00:00:00');
  }

  if (enableGoal) {
    enableGoal.checked = goalEnabled;
    toggleGoal(goalEnabled);
  }

  if (goal && goalEnabled) {
    goalDateInput.value = goal;
    goalDate = new Date(goal + 'T00:00:00');
  }

  if (start) {
    timer = setInterval(updateCounters, 1000);
    updateCounters();
  }
}

// ===== INICIAR AO CARREGAR =====
window.onload = loadData;

// ===== Funções do Modal =====
function openGoalModal() {
  document.getElementById('goalModal').classList.remove('hidden');
}
function closeGoalModal() {
  document.getElementById('goalModal').classList.add('hidden');
}

// == Salvar Meta ==//
function saveGoal() {
  const titleEl = document.getElementById('goalTitle');
  const title = titleEl ? titleEl.value.trim() : '';
  const dateEl = document.getElementById('goalDateModal');
  const dateValue = dateEl ? dateEl.value : '';
  if (!title || !dateValue) {
    alert('Preencha todos os campos da meta');
    return;
  }
  goalDate = new Date(dateValue + 'T00:00:00');

  if (goalBox) goalBox.classList.remove('hidden');
  if (goalLabel) goalLabel.innerText = title;
  if (goalDateInput) goalDateInput.value = dateValue;

  localStorage.setItem('goalTitle', title);
  localStorage.setItem('goalDate', dateValue);

  closeGoalModal();
}