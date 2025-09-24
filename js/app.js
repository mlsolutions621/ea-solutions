// Mobile menu toggle
document.querySelector('.mobile-menu').addEventListener('click', function() {
    document.querySelector('nav ul').classList.toggle('active');
});

// Newsletter form submission
document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input').value;
    // Note: JavaScript alone cannot send emails directly to your inbox (like mlsolutions621@gmail.com)
    // without a backend service. The following code simulates the action.
    // A common workaround for static sites is to use a third-party service like EmailJS, Formspree, or Netlify Forms.
    // For now, we'll show an alert and open the user's default email client pre-filled.
    // This is a client-side only solution, so the email isn't actually sent to mlsolutions621@gmail.com automatically.
    // Consider using a service like Formspree for true form functionality.

    // Example using mailto link (opens user's email client):
    const mailtoLink = `mailto:mlsolutions621@gmail.com?subject=Newsletter Subscription&body=Email Address: ${encodeURIComponent(email)}`;
    window.location.href = mailtoLink;

    // Alert user
    alert(`Thank you for subscribing with ${email}! A request has been initiated to add your email. Please check your email client.`);
    // Reset the form after the alert
    this.reset();
});
