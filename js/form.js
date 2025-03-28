// Form Validation and Interaction
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Add focus/blur effects
        const inputs = contactForm.querySelectorAll('.form-control');
        
        inputs.forEach(input => {
            const formGroup = input.closest('.form-group');
            
            input.addEventListener('focus', () => {
                formGroup.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    formGroup.classList.remove('focused');
                }
            });
            
            // Check if input has value on page load
            if (input.value) {
                formGroup.classList.add('focused');
            }
        });
        
        // Form validation
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            
            // Validate each field
            inputs.forEach(input => {
                const formGroup = input.closest('.form-group');
                const errorMessage = formGroup.querySelector('.error-message');
                
                if (!input.value) {
                    input.classList.add('error');
                    errorMessage.style.display = 'block';
                    isValid = false;
                } else {
                    input.classList.remove('error');
                    errorMessage.style.display = 'none';
                }
                
                // Special email validation
                if (input.type === 'email' && input.value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value)) {
                        input.classList.add('error');
                        errorMessage.textContent = 'Please enter a valid email address';
                        errorMessage.style.display = 'block';
                        isValid = false;
                    }
                }
            });
            
            // If form is valid, show success message
            if (isValid) {
                const submitBtn = contactForm.querySelector('.btn-submit');
                const btnText = submitBtn.querySelector('.btn-text');
                const btnIcon = submitBtn.querySelector('.btn-icon');
                const feedback = contactForm.querySelector('.form-feedback');
                
                // Change button state
                btnText.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission (replace with actual AJAX call)
                setTimeout(() => {
                    btnIcon.classList.remove('fa-paper-plane');
                    btnIcon.classList.add('fa-check');
                    btnText.textContent = 'Message Sent!';
                    
                    // Show success message
                    feedback.style.display = 'block';
                    feedback.textContent = 'Thank you for your message! I will get back to you soon.';
                    feedback.classList.add('success');
                    
                    // Reset form after 3 seconds
                    setTimeout(() => {
                        contactForm.reset();
                        btnIcon.classList.remove('fa-check');
                        btnIcon.classList.add('fa-paper-plane');
                        btnText.textContent = 'Send Message';
                        submitBtn.disabled = false;
                        feedback.style.display = 'none';
                        
                        // Remove focused class from all inputs
                        inputs.forEach(input => {
                            input.closest('.form-group').classList.remove('focused');
                        });
                    }, 3000);
                }, 1500);
            }
        });
    }
});