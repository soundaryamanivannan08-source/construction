document.addEventListener('DOMContentLoaded', () => {
    // Check if already logged in
    const storedData = localStorage.getItem('stackly_user');
    if (storedData) {
        const user = JSON.parse(storedData);
        if (user.role === 'admin') {
            window.location.href = 'admin-dashboard.html';
        } else {
            window.location.href = 'user-dashboard.html';
        }
        return;
    }

    const form = document.getElementById('signup-form');
    const roleInput = document.getElementById('role');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const termsInput = document.getElementById('terms');
    const registerBtn = document.getElementById('register-btn');
    const passwordGroup = document.getElementById('password-group');

    // Validation Regex
    const usernameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Password constraints
    const hasUpperCase = /[A-Z]/;
    const hasLowerCase = /[a-z]/;
    const hasNumbers = /\d/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

    // State object to track validity
    const validity = {
        role: false,
        username: false,
        email: false,
        password: false,
        confirmPassword: false,
        terms: false
    };

    function updateSubmitButton() {
        const isValid = Object.values(validity).every(val => val === true);
        registerBtn.disabled = !isValid;
    }

    function setValid(element, isValid) {
        if (isValid) {
            element.classList.add('valid');
            element.classList.remove('invalid');
        } else {
            element.classList.add('invalid');
            element.classList.remove('valid');
        }
    }

    // Role Validation
    roleInput.addEventListener('change', (e) => {
        validity.role = e.target.value !== '';
        setValid(roleInput, validity.role);
        updateSubmitButton();
    });

    // Username Validation
    usernameInput.addEventListener('input', (e) => {
        const val = e.target.value;
        validity.username = val.length > 0 && usernameRegex.test(val);
        setValid(usernameInput, validity.username);
        updateSubmitButton();
    });

    // Email Validation
    emailInput.addEventListener('input', (e) => {
        const val = e.target.value;
        validity.email = emailRegex.test(val);
        setValid(emailInput, validity.email);
        updateSubmitButton();
    });

    // Password Validation & Strength
    passwordInput.addEventListener('input', (e) => {
        const val = e.target.value;
        
        // Validate
        validity.password = val.length >= 6 && 
                            hasUpperCase.test(val) && 
                            hasLowerCase.test(val) && 
                            hasNumbers.test(val) && 
                            hasSpecialChar.test(val);
                            
        setValid(passwordInput, validity.password);
        
        // Re-validate confirm password if it has value
        if (confirmPasswordInput.value) {
            validity.confirmPassword = val === confirmPasswordInput.value;
            setValid(confirmPasswordInput, validity.confirmPassword);
        }

        // Strength Indicator
        passwordGroup.classList.remove('strength-weak', 'strength-medium', 'strength-strong');
        const strengthText = passwordGroup.querySelector('.strength-text');
        
        if (val.length > 0) {
            passwordGroup.classList.add('strength-active');
            let score = 0;
            if (val.length >= 6) score++;
            if (hasUpperCase.test(val) && hasLowerCase.test(val)) score++;
            if (hasNumbers.test(val)) score++;
            if (hasSpecialChar.test(val)) score++;

            if (score <= 2) {
                passwordGroup.classList.add('strength-weak');
                strengthText.textContent = 'Weak';
            } else if (score === 3) {
                passwordGroup.classList.add('strength-medium');
                strengthText.textContent = 'Medium';
            } else if (score >= 4) {
                passwordGroup.classList.add('strength-strong');
                strengthText.textContent = 'Strong';
            }
        } else {
            passwordGroup.classList.remove('strength-active');
        }

        updateSubmitButton();
    });

    // Confirm Password Validation
    confirmPasswordInput.addEventListener('input', (e) => {
        const val = e.target.value;
        validity.confirmPassword = val.length > 0 && val === passwordInput.value;
        setValid(confirmPasswordInput, validity.confirmPassword);
        updateSubmitButton();
    });

    // Terms Validation
    termsInput.addEventListener('change', (e) => {
        validity.terms = e.target.checked;
        updateSubmitButton();
    });

    // Form Submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (registerBtn.disabled) return;

        // Start loading animation
        registerBtn.classList.add('loading');
        
        // Simulate network delay for effect
        setTimeout(() => {
            const user = {
                role: roleInput.value,
                username: usernameInput.value.trim(),
                email: emailInput.value.trim(),
                password: passwordInput.value
            };

            // Save to localStorage
            localStorage.setItem('stackly_user', JSON.stringify(user));
            
            // Redirect to login
            window.location.href = 'login.html';
        }, 1500);
    });
});

// Toggle password visibility
function togglePassword(inputId, icon) {
    const input = document.getElementById(inputId);
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}
