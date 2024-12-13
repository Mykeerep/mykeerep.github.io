
        document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const signupButton = document.querySelector('.signup-btn');
    const dimmedButton = document.querySelector('.dimmed-button');

    function toggleButton() {
        if (emailInput.value.trim() && passwordInput.value.trim().length >= 6) {
            signupButton.style.display = 'block';
            dimmedButton.style.display = 'none';
        } else {
            signupButton.style.display = 'none';
            dimmedButton.style.display = 'block';
        }
    }

    emailInput.addEventListener('input', toggleButton);
    passwordInput.addEventListener('input', toggleButton);

    // Initialize button state
    toggleButton();
});

  
