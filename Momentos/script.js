let startDate = null;
let goalDate = null;
let timer = null;

// Alternar meta
document.getElementById('enableGoal').addEventListener('change', () => {
  const enabled = document.getElementById('enableGoal').checked;

  document.getElementById('goalBox').classList.toggle('hidden', !enabled);
  document.getElementById('goalDate').classList.toggle('hidden', !enabled);
  document.getElementById('goalLabel').classList.toggle('hidden', !enabled);
});

// Escolha de imagem de fundo
document.getElementById('backgroundInput').addEventListener('change', function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    document.body.style.backgroundImage = `url('${e.target.result}')`;
  };
  reader.readAsDataURL(file);
});

function startCounter() {
  const names = document.getElementById('namesInput').value.trim();
  const startValue = document.getElementById('startDate').value;
  const goalEnabled = document.getElementById('enableGoal').checked;

  if (!startValue) {
    alert('Informe a data de início do relacionamento');
    return;
  }

  startDate = new Date(startValue + 'T00:00:00');

  if (names) {
    const nameDiv = document.getElementById('coupleNames');
    nameDiv.innerText = names;
    nameDiv.classList.remove('hidden');
  }

  if (goalEnabled) {
    const goalValue = document.getElementById('goalDate').value;
    if (goalValue) {
      goalDate = new Date(goalValue + 'T00:00:00');
    }
  } else {
    goalDate = null;
  }

  if (!timer) {
    timer = setInterval(updateCounters, 1000);
  }

  updateCounters();
}

function updateCounters() {
  const now = new Date();

  if (startDate) {
    const diff = dateDiff(startDate, now);
    document.getElementById('relationshipTime').innerText =
      `${diff.years} anos, ${diff.months} meses, ${diff.days} dias, ` +
      `${diff.hours}h ${diff.minutes}m ${diff.seconds}s`;
  }

  if (goalDate) {
    const diff = dateDiff(now, goalDate);
    document.getElementById('goalTime').innerText =
      diff.totalSeconds > 0
        ? `${diff.years} anos, ${diff.months} meses, ${diff.days} dias, ` +
          `${diff.hours}h ${diff.minutes}m ${diff.seconds}s`
        : 'Meta alcançada 🎉';
  }
}

function dateDiff(start, end) {
  let delta = Math.floor((end - start) / 1000);
  delta = Math.abs(delta);

  const seconds = delta % 60;
  const minutes = Math.floor(delta / 60) % 60;
  const hours = Math.floor(delta / 3600) % 24;
  const days = Math.floor(delta / 86400) % 30;
  const months = Math.floor(delta / (86400 * 30)) % 12;
  const years = Math.floor(delta / (86400 * 365));

  return {
    years,
    months,
    days,
    hours,
    minutes,
    seconds,
    totalSeconds: end - start
  };
}
function saveData() {
  localStorage.setItem('names', namesInput.value);
  localStorage.setItem('startDate', startDateInput.value);
  localStorage.setItem('enableGoal', enableGoal.checked);
  localStorage.setItem('goalDate', goalDateInput.value);
}
