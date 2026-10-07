/**
 * Personal Expense Tracker - Client-Side JavaScript
 * Handles:
 * - Mobile navigation menu toggle
 * - Password visibility toggle
 * - Daily summary notification modal on Dashboard load
 * - Flash alert auto-dismiss
 */

document.addEventListener('DOMContentLoaded', function () {
    // -------------------------------------------------------------------------
    // 1. Mobile Navigation Hamburger Menu
    // -------------------------------------------------------------------------
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
            }
        });
    }

    // -------------------------------------------------------------------------
    // 2. Auto-dismiss Flash Alerts after 6 seconds
    // -------------------------------------------------------------------------
    const alerts = document.querySelectorAll('.flash-alert');
    alerts.forEach(function (alert) {
        setTimeout(function () {
            if (alert && alert.parentElement) {
                alert.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                alert.style.opacity = '0';
                alert.style.transform = 'translateY(-10px)';
                setTimeout(function () {
                    if (alert.parentElement) alert.remove();
                }, 400);
            }
        }, 6000);
    });

    // -------------------------------------------------------------------------
    // 3. Daily Summary Notification Modal (Feature 8)
    // -------------------------------------------------------------------------
    const notifModal = document.getElementById('dailyNotificationModal');
    const modalContent = document.getElementById('modalNotificationContent');
    const closeBtn = document.getElementById('closeNotificationModal');
    const dismissBtn = document.getElementById('dismissModalBtn');

    if (notifModal && modalContent) {
        // Fetch today's summary from our Flask API
        fetch('/api/daily-notification')
            .then(function (response) {
                if (!response.ok) throw new Error('Network error fetching daily notification');
                return response.json();
            })
            .then(function (data) {
                // Check if user already dismissed it in this browser session for today
                const sessionKey = 'daily_notif_seen_' + data.date;
                const alreadySeen = sessionStorage.getItem(sessionKey);

                // Show notification if there are transactions recorded today and not yet dismissed
                if (data.has_transactions && !alreadySeen) {
                    renderDailyNotification(data);
                    notifModal.style.display = 'flex';
                }
            })
            .catch(function (err) {
                console.log('Daily notification check:', err);
            });

        // Helper function to render modal content cleanly
        function renderDailyNotification(data) {
            const formatINR = function (num) {
                return '₹' + Number(num).toLocaleString('en-IN', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
            };

            let bannerClass = 'banner-info';
            let balanceColor = data.today_balance >= 0 ? 'text-success' : 'text-danger';

            if (data.status === 'saved') {
                bannerClass = 'banner-success';
            } else if (data.status === 'deficit') {
                bannerClass = 'banner-danger';
            }

            modalContent.innerHTML = `
                <div class="notification-details">
                    <p style="margin-bottom: 0.8rem; font-size: 0.95rem; color: #475569;">
                        Here is a quick snapshot of your finances today (<strong>${data.date}</strong>):
                    </p>

                    <div class="notification-metrics">
                        <div class="notif-stat-box">
                            <span>Today's Income</span>
                            <strong class="text-success">${formatINR(data.today_income)}</strong>
                        </div>
                        <div class="notif-stat-box">
                            <span>Today's Expense</span>
                            <strong class="text-danger">${formatINR(data.today_expense)}</strong>
                        </div>
                        <div class="notif-stat-box">
                            <span>Remaining Balance</span>
                            <strong class="${balanceColor}">${formatINR(data.today_balance)}</strong>
                        </div>
                    </div>

                    <div class="notification-banner-box ${bannerClass}">
                        ${data.message}
                    </div>
                </div>
            `;
        }

        // Close and record in sessionStorage so it doesn't annoy user on every refresh
        const closeModal = function () {
            notifModal.style.display = 'none';
            // Mark as seen for this session
            const todayStr = new Date().toISOString().split('T')[0];
            sessionStorage.setItem('daily_notif_seen_' + todayStr, 'true');
        };

        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (dismissBtn) dismissBtn.addEventListener('click', closeModal);

        // Close on clicking backdrop
        notifModal.addEventListener('click', function (e) {
            if (e.target === notifModal) {
                closeModal();
            }
        });
    }
});

// -----------------------------------------------------------------------------
// 4. Password Visibility Toggle
// -----------------------------------------------------------------------------
function togglePasswordVisibility(inputId, buttonElement) {
    const passwordInput = document.getElementById(inputId);
    if (!passwordInput) return;

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        buttonElement.textContent = '🙈';
        buttonElement.title = 'Hide password';
    } else {
        passwordInput.type = 'password';
        buttonElement.textContent = '👁️';
        buttonElement.title = 'Show password';
    }
}
