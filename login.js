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

    const form = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.getElementById('login-btn');
    const errorAlert = document.getElementById('login-error');
    const successAlert = document.getElementById('login-success');

    const validity = {
        email: false,
        password: false
    };

    function updateSubmitButton() {
        const isValid = Object.values(validity).every(val => val === true);
        loginBtn.disabled = !isValid;
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

    // Basic Email Validation (Must have @ and .)
    emailInput.addEventListener('input', (e) => {
        const val = e.target.value.toLowerCase().trim();
        // Just checking basic email format to be polite, no @gmail.com enforcement
        validity.email = val.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
        setValid(emailInput, validity.email);
        updateSubmitButton();
        errorAlert.classList.remove('show');
    });

    // Password Validation (Any password allowed)
    passwordInput.addEventListener('input', (e) => {
        const val = e.target.value;
        validity.password = val.length > 0;
        setValid(passwordInput, validity.password);
        updateSubmitButton();
        errorAlert.classList.remove('show');
    });

    // Form Submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (loginBtn.disabled) return;

        errorAlert.classList.remove('show');
        successAlert.classList.remove('show');

        // Start loading animation
        loginBtn.classList.add('loading');

        setTimeout(() => {
            const enteredEmail = emailInput.value.toLowerCase().trim();
            const enteredPassword = passwordInput.value;

            // Stop loading
            loginBtn.classList.remove('loading');

            // Success regardless of input!
            successAlert.classList.add('show');
            
            // Redirect based on email content
            setTimeout(() => {
                if (enteredEmail.includes('admin')) {
                    // Create dummy admin session
                    localStorage.setItem('stackly_user', JSON.stringify({
                        email: enteredEmail,
                        password: enteredPassword,
                        role: 'admin',
                        username: 'Admin User'
                    }));
                    window.location.href = 'admin-dashboard.html';
                } else {
                    // Create dummy user session
                    localStorage.setItem('stackly_user', JSON.stringify({
                        email: enteredEmail,
                        password: enteredPassword,
                        role: 'user',
                        username: enteredEmail.split('@')[0]
                    }));
                    window.location.href = 'user-dashboard.html';
                }
            }, 1000);
        }, 800);
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
