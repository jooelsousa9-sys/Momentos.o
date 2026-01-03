let startDate = null;
let goalDate = null;
let timer = null;

// ===== META =====
document.getElementById('enableGoal').addEventListener('change', () => {
  const enabled = enableGoal.checked;
  toggleGoal(enabled);
  saveData();
});

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

  if (enableGoal.checked && goalDateInput.value) {
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
  localStorage.setItem('enableGoal', enableGoal.checked);
  localStorage.setItem('goalDate', goalDateInput.value);
}

function loadData() {
  const names = localStorage.getItem('names');
  const start = localStorage.getItem('startDate');
  const goalEnabled = localStorage.getItem('enableGoal') === 'true';
  const goal = localStorage.getItem('goalDate');
  const bg = localStorage.getItem('backgroundImage');

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

  enableGoal.checked = goalEnabled;
  toggleGoal(goalEnabled);

  if (goal && goalEnabled) {
    goalDateInput.value = goal;
    goalDate = new Date(goal + 'T00:00:00');
  }

  if (start) {
    timer = setInterval(updateCounters, 1000);
    updateCounters();
  }
}

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

// ===== INICIAR AO CARREGAR =====
window.onload = loadData;
