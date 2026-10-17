const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    menuToggle.textContent = open ? '×' : '☰';
  });
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Menü öffnen');
    menuToggle.textContent = '☰';
  }));
}
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
const form = document.getElementById('contact-form');
if (form) form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const subject = `Anfrage über die MKZ-Webseite – ${data.get('service')}`;
  const body = [
    'Guten Tag MKZ Sicherheitsdienst,', '',
    'ich möchte eine Anfrage stellen.', '',
    `Name: ${data.get('name')}`,
    `Unternehmen: ${data.get('company') || 'Nicht angegeben'}`,
    `E-Mail: ${data.get('email')}`,
    `Telefon: ${data.get('phone') || 'Nicht angegeben'}`,
    `Gewünschte Leistung: ${data.get('service')}`, '',
    'Nachricht:', data.get('message'), '',
    'Viele Grüße', data.get('name')
  ].join('\n');
  const mailto = `mailto:mkz.sicherheitsdienst@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const status = document.getElementById('form-status');
  status.textContent = 'Ihr E-Mail-Programm sollte sich jetzt öffnen. Bitte prüfen Sie die Nachricht und senden Sie sie dort ab.';
  window.location.href = mailto;
});
