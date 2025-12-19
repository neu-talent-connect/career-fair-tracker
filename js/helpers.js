// Utility functions

// Set date input to today
function setToday(inputId) {
    const input = document.getElementById(inputId);
    if (input) {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        input.value = `${year}-${month}-${day}`;
    }
}

// Set datetime to now
function setTodayTime(inputId) {
    const input = document.getElementById(inputId);
    if (input) {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        input.value = `${year}-${month}-${day}T${hours}:${minutes}`;
    }
}

// Copy email template to clipboard
function copyTemplate(button) {
    const template = button.previousElementSibling.textContent;
    navigator.clipboard.writeText(template).then(() => {
        const originalText = button.textContent;
        button.textContent = '✓ Copied!';
        setTimeout(() => {
            button.textContent = originalText;
        }, 2000);
    }).catch(error => {
        console.error('Failed to copy:', error);
        alert('Failed to copy template. Please select and copy manually.');
    });
}

// Hide the getting started banner
function dismissGettingStarted() {
    const banner = document.getElementById('gettingStartedBanner');
    if (banner) {
        banner.style.display = 'none';
        localStorage.setItem('gettingStartedDismissed', 'true');
    }
}

// Show banner if user hasn't dismissed it and has no jobs yet
function checkGettingStartedBanner() {
    const dismissed = localStorage.getItem('gettingStartedDismissed');
    const banner = document.getElementById('gettingStartedBanner');
    
    // Only show if not dismissed AND there are no jobs yet
    if (!dismissed && data.jobs.length === 0 && banner) {
        banner.style.display = 'flex';
    }
}

