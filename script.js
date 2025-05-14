document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const messageInput = document.getElementById('message'); // Optional, not validating this one strictly

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    // const messageError = document.getElementById('messageError'); // If you add validation for message

    const successMessage = document.getElementById('successMessage');
    const submitButton = document.getElementById('submitButton');

    // --- Helper Functions ---
    function showError(inputElement, errorElement, message) {
        errorElement.textContent = message;
        inputElement.classList.add('invalid');
        inputElement.classList.remove('valid'); // In case you add a 'valid' class
    }

    function clearError(inputElement, errorElement) {
        errorElement.textContent = '';
        inputElement.classList.remove('invalid');
        inputElement.classList.add('valid'); // Optional: for green border on valid
    }

    function isValidEmail(email) {
        // Basic regex for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // --- Validation Functions ---
    function validateName() {
        if (nameInput.value.trim() === '') {
            showError(nameInput, nameError, 'Full Name is required.');
            return false;
        }
        clearError(nameInput, nameError);
        return true;
    }

    function validateEmail() {
        const emailValue = emailInput.value.trim();
        if (emailValue === '') {
            showError(emailInput, emailError, 'Email Address is required.');
            return false;
        } else if (!isValidEmail(emailValue)) {
            showError(emailInput, emailError, 'Please enter a valid email address.');
            return false;
        }
        clearError(emailInput, emailError);
        return true;
    }

    function validatePassword() {
        const passwordValue = passwordInput.value;
        if (passwordValue === '') {
            showError(passwordInput, passwordError, 'Password is required.');
            return false;
        } else if (passwordValue.length < 8) {
            showError(passwordInput, passwordError, 'Password must be at least 8 characters long.');
            return false;
        }
        clearError(passwordInput, passwordError);
        return true;
    }

    function validateConfirmPassword() {
        const passwordValue = passwordInput.value;
        const confirmPasswordValue = confirmPasswordInput.value;
        if (confirmPasswordValue === '') {
            showError(confirmPasswordInput, confirmPasswordError, 'Please confirm your password.');
            return false;
        } else if (passwordValue !== confirmPasswordValue) {
            showError(confirmPasswordInput, confirmPasswordError, 'Passwords do not match.');
            return false;
        }
        clearError(confirmPasswordInput, confirmPasswordError);
        return true;
    }

    // --- Event Listeners for real-time feedback ---
    nameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);
    passwordInput.addEventListener('blur', () => {
        validatePassword();
        // Re-validate confirm password if password changes, as they are linked
        if (confirmPasswordInput.value.trim() !== '') {
            validateConfirmPassword();
        }
    });
    confirmPasswordInput.addEventListener('blur', validateConfirmPassword);

    // Also on input for more immediate feedback (optional, can be a bit "noisy")
    // nameInput.addEventListener('input', validateName);
    // emailInput.addEventListener('input', validateEmail);
    // passwordInput.addEventListener('input', validatePassword);
    // confirmPasswordInput.addEventListener('input', validateConfirmPassword);


    // --- Form Submission Handler ---
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Perform all validations
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
        // const isMessageValid = validateMessage(); // If you add message validation

        if (isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
            successMessage.textContent = `Thank you, ${nameInput.value}! Your message has been sent.`;
            successMessage.style.display = 'block';
            form.reset(); // Clear the form fields

            // Clear any lingering error states visually
            [nameInput, emailInput, passwordInput, confirmPasswordInput].forEach(input => {
                input.classList.remove('invalid');
                input.classList.remove('valid'); // remove valid class too after submission
            });
            nameError.textContent = '';
            emailError.textContent = '';
            passwordError.textContent = '';
            confirmPasswordError.textContent = '';

            // Optionally hide success message after a few seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        } else {
            successMessage.style.display = 'none';
            // Focus on the first invalid field (optional improvement)
            if (!isNameValid) nameInput.focus();
            else if (!isEmailValid) emailInput.focus();
            else if (!isPasswordValid) passwordInput.focus();
            else if (!isConfirmPasswordValid) confirmPasswordInput.focus();
        }
    });
});