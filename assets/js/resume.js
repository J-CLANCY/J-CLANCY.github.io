document.addEventListener("DOMContentLoaded", function() {
  const educationEntries = document.querySelectorAll(".timeline-entry.education");
  const workEntries = document.querySelectorAll(".timeline-entry.work");
  const timelineSegmentsContainer = document.querySelector(".timeline-segments");

  const allEntries = [...educationEntries, ...workEntries];
  const dates = allEntries.map(entry => ({
    start: new Date(entry.dataset.start),
    end: new Date(entry.dataset.end)
  }));

  const minDate = new Date(Math.min(...dates.map(date => date.start)));
  const maxDate = new Date(Math.max(...dates.map(date => date.end)));

  const minYear = minDate.getFullYear();
  const maxYear = maxDate.getFullYear();

  const totalYears = maxYear - minYear + 1;

  // Set the total number of years as a CSS variable
  document.documentElement.style.setProperty('--total-years', totalYears);

  // Create year segments in reverse order
  for (let year = minYear+1; year <= maxYear+1; year++) {
    const segment = document.createElement('div');
    segment.classList.add('timeline-segment');
    const yearLabel = document.createElement('div');
    yearLabel.classList.add('year-label');
    yearLabel.textContent = year;
    segment.appendChild(yearLabel);
    const line = document.createElement('div');
    line.classList.add("timeline-line");
    segment.appendChild(line);
    timelineSegmentsContainer.appendChild(segment);
  }

  const segmentHeight = 100 / totalYears;

  // Adjust the position and height of entries
  allEntries.forEach(entry => {
    const entryStart = new Date(entry.dataset.start);
    const entryEnd = new Date(entry.dataset.end);

    const startYearFraction = (entryStart.getMonth()) / 12;
    const endYearFraction = (entryEnd.getMonth()) / 12;

    const entryStartYearPosition = entryStart.getFullYear() - minYear + startYearFraction;
    const entryEndYearPosition = entryEnd.getFullYear() - minYear + endYearFraction;

    const entryBottom = (entryStartYearPosition * segmentHeight);
    const entryHeight = ((entryEndYearPosition - entryStartYearPosition) * segmentHeight);

    entry.style.bottom = `${entryBottom}%`;
    entry.style.height = `${entryHeight}%`;
  });

  const entries = document.querySelectorAll('.timeline-entry');
  const dialogs = document.querySelectorAll('.timeline-dialog');
  const closeDialogButtons = document.querySelectorAll('.close-dialog');

  entries.forEach((entry, index) => {
    entry.addEventListener('click', function() {
      dialogs[index].showModal();
    });
  });

  closeDialogButtons.forEach((button, index) => {
    button.addEventListener('click', function() {
      dialogs[index].close();
    });
  });

  dialogs.forEach((dialog, index) => {
    dialog.addEventListener('click', function (event) {
      var rect = dialog.getBoundingClientRect();
      var isInDialog=(rect.top <= event.clientY && event.clientY <= rect.top + rect.height
        && rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
      if (!isInDialog) {
          dialog.close();
      }
    });
  });
});
