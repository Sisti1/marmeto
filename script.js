const toggleBtns = document.querySelectorAll('.toggle-btn');

toggleBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    toggleBtns.forEach(btn => btn.classList.remove('active'));
    // Add active class to the clicked button
    btn.classList.add('active');
  });
});