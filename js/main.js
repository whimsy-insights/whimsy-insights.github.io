document.addEventListener('DOMContentLoaded', () => {
  // ———————— Mobile Navigation ————————
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

  // ———————— Contact Form Handling ————————
  const form = document.querySelector('#contact-form');
  if (!form) return; // this page has no form → stop here

  const successContainer = document.querySelector('#form-success');

  form.addEventListener('submit', async (event) => {
    event.preventDefault(); // stop normal submit

    // Grab fields (safer than querySelector each time)
    const fields = {
      name: form.elements.name,
      email: form.elements.email,
      company: form.elements.company,
      description: form.elements.description,
    };

    let hasError = false;

    // Clear previous messages
    form.querySelectorAll('.error-message').forEach((msg) => (msg.textContent = ''));
    successContainer.innerHTML = '';

    // ——— Validation ———
    if (!fields.name.value.trim()) {
      setError(fields.name, 'Full name is required.');
      hasError = true;
    }

    if (!fields.email.value.trim()) {
      setError(fields.email, 'Email is required.');
      hasError = true;
    } else if (!isEmail(fields.email.value.trim())) {
      setError(fields.email, 'Please enter a valid email address.');
      hasError = true;
    }

    if (!fields.description.value.trim()) {
      setError(fields.description, 'Please describe your needs.');
      hasError = true;
    }

    if (hasError) return;

    // ——— Send to Formspree ———
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        successContainer.innerHTML =
          '<div class="success-message">Thank you! We’ll review your request and get back to you shortly.</div>';
        form.reset();
      } else {
        throw new Error('Server responded with ' + response.status);
      }
    } catch (err) {
      successContainer.innerHTML =
        '<div class="error-message">Oops! Something went wrong. Please try again later or email us directly.</div>';
      console.error('Form submission error:', err);
    }
  });

  // ———————— Helper Functions ————————
  function setError(field, message) {
    const errorDiv = field.parentElement.querySelector('.error-message');
    if (errorDiv) errorDiv.textContent = message;
  }

  function isEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }
});
