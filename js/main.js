document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-links a');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    navItems.forEach((link) => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  const form = document.querySelector('#contact-form');
  if (!form) return;

  const successContainer = document.querySelector('#form-success');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const fields = {
      name: form.querySelector('#name'),
      email: form.querySelector('#email'),
      company: form.querySelector('#company'),
      description: form.querySelector('#description'),
    };

    let hasError = false;
    form.querySelectorAll('.error-message').forEach((msg) => (msg.textContent = ''));

    if (!fields.name.value.trim()) {
      setError(fields.name, 'Full name is required.');
      hasError = true;
    }

    if (!fields.email.value.trim()) {
      setError(fields.email, 'Email is required.');
      hasError = true;
    } else if (!isEmail(fields.email.value)) {
      setError(fields.email, 'Please enter a valid email address.');
      hasError = true;
    }

    if (!fields.description.value.trim()) {
      setError(fields.description, 'Please describe your needs.');
      hasError = true;
    }

    if (hasError) {
      successContainer.innerHTML = '';
      return;
    }

    successContainer.innerHTML = '<div class="success-message">Thank you! We’ll review your request and get back to you shortly.</div>';
    form.reset();
  });
});

function setError(field, message) {
  const feedback = field.parentElement.querySelector('.error-message');
  if (feedback) {
    feedback.textContent = message;
  }
}

function isEmail(value) {
  return /[^\s@]+@[^\s@]+\.[^\s@]+/.test(value);
}
