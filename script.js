// Form submission with Formspree integration
document.querySelectorAll("form").forEach(form => {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formMessage = document.getElementById("form-message");
    formMessage.innerHTML = ""; // Clear previous messages

    const formData = new FormData(form);

    fetch(form.action, {
      method: "POST",
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        formMessage.innerHTML = '<div class="alert alert-success">Thank you for contacting us! We will respond soon.</div>';
        form.reset();
      } else {
        response.json().then(data => {
          const errorMsg = data.errors ? data.errors.map(err => err.message).join(", ") : "There was a problem.";
          formMessage.innerHTML = `<div class="alert alert-danger">${errorMsg}</div>`;
        });
      }
    }).catch(error => {
      formMessage.innerHTML = '<div class="alert alert-danger">There was a problem submitting the form. Please try again later.</div>';
      console.error("Error:", error);
    });
  });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if(window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if(target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Fade-in sections on scroll
const sections = document.querySelectorAll('section');
const options = {
  threshold: 0.1
};

const observer = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, options);

sections.forEach(section => {
  section.classList.add('fade-section'); // initial hidden state
  observer.observe(section);
});
