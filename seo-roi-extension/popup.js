const form = document.getElementById('roi-form');
const errorEl = document.getElementById('error');
const resultsEl = document.getElementById('results');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const traffic = parseFloat(document.getElementById('traffic').value);
  const conversion = parseFloat(document.getElementById('conversion').value);
  const value = parseFloat(document.getElementById('value').value);
  const cost = parseFloat(document.getElementById('cost').value);

  const inputs = [traffic, conversion, value, cost];
  if (inputs.some((n) => isNaN(n) || n < 0) || cost <= 0) {
    errorEl.textContent = 'Enter valid, non-negative numbers (SEO investment must be greater than 0).';
    errorEl.hidden = false;
    resultsEl.hidden = true;
    return;
  }
  errorEl.hidden = true;

  const revenue = traffic * (conversion / 100) * value;
  const roi = ((revenue - cost) / cost) * 100;

  document.getElementById('revenue-out').textContent = `$${revenue.toFixed(2)}`;
  document.getElementById('roi-out').textContent = `${roi.toFixed(1)}%`;

  Object.assign(resultsEl.dataset, {
    traffic,
    conversion,
    value,
    cost,
    revenue: revenue.toFixed(2),
    roi: roi.toFixed(1),
  });

  resultsEl.hidden = false;
});

document.getElementById('email-btn').addEventListener('click', () => {
  const r = resultsEl.dataset;
  const subject = encodeURIComponent('SEO ROI Results — Interested in ICE Castle');
  const body = encodeURIComponent(
    `Hi ICE Castle team,\n\n` +
    `I ran the SEO ROI calculator and here's what I found:\n\n` +
    `Monthly organic traffic: ${r.traffic}\n` +
    `Conversion rate: ${r.conversion}%\n` +
    `Average customer value: $${r.value}\n` +
    `Monthly SEO investment: $${r.cost}\n\n` +
    `Estimated monthly revenue from SEO: $${r.revenue}\n` +
    `Estimated ROI: ${r.roi}%\n\n` +
    `I'd like to talk about this.\n`
  );
  window.location.href = `mailto:sales@icecastle.si?subject=${subject}&body=${body}`;
});
