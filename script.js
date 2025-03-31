// Toggle password visibility in login page
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
      passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
    }
  }
    
  // Login form handling: simulate login and redirect to register page
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      if (email && password) {
        // Simulate successful login – in real life, validate credentials
        window.location.href = 'register.html';
      } else {
        alert('Please enter valid login credentials.');
      }
    });
  }
    
  // Register form handling: redirect based on role
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const role = document.getElementById('role').value;
      if (role === 'donor') {
        window.location.href = 'campaign.html';
      } else if (role === 'fundraiser') {
        window.location.href = 'create-campaign.html';
      } else {
        alert('Please select a valid role.');
      }
    });
  }
    
  // Create Campaign form: save new campaign and redirect to campaign page
  const createCampaignForm = document.getElementById('createCampaignForm');
  if (createCampaignForm) {
    createCampaignForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const patientDetails = document.getElementById('patientDetails').value;
      const goalAmount = document.getElementById('goalAmount').value;
      const collectedAmount = document.getElementById('collectedAmount').value;
      const endDate = document.getElementById('endDate').value;
      
      if (patientDetails && goalAmount && collectedAmount !== null && endDate) {
        // Create a new campaign object
        const newCampaign = {
          patientDetails,
          goalAmount,
          collectedAmount,
          endDate
        };
        
        // Save to localStorage (retrieve existing campaigns, append new one)
        let campaigns = JSON.parse(localStorage.getItem('customCampaigns')) || [];
        campaigns.push(newCampaign);
        localStorage.setItem('customCampaigns', JSON.stringify(campaigns));
        
        // Redirect to campaign page
        window.location.href = 'campaign.html';
      } else {
        alert('Please fill in all details.');
      }
    });
  }
    
  // When loading the campaign page, add custom campaigns (if any)
  function loadCustomCampaigns() {
    const campaignList = document.getElementById('campaignList');
    if (campaignList) {
      let campaigns = JSON.parse(localStorage.getItem('customCampaigns')) || [];
      campaigns.forEach(camp => {
        const div = document.createElement('div');
        div.className = 'campaign';
        div.innerHTML = `<h2>${camp.patientDetails}</h2>
                           <p><strong>Goal:</strong> ₹${camp.goalAmount}</p>
                           <p><strong>Collected:</strong> ₹${camp.collectedAmount}</p>
                           <p><strong>End Date:</strong> ${camp.endDate}</p>
                           <button onclick="donateCampaign()">Donate</button>`;
        campaignList.appendChild(div);
      });
    }
  }
  // Run on campaign page load
  if (document.getElementById('campaignList')) {
    loadCustomCampaigns();
  }
    
  // Donate button: redirect to payment page
  function donateCampaign() {
    window.location.href = 'payment.html';
  }
    
  // Payment form handling
  const paymentForm = document.getElementById('paymentForm');
  if (paymentForm) {
    paymentForm.addEventListener('submit', function(event) {
      event.preventDefault();
      // You can process payment details here
      alert('Thanks for donating!');
      // Optionally, redirect back to campaign page
      window.location.href = 'campaign.html';
    });
  }
    
  // Contact form handling: intercept submission and show notification
  const contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent default POST action that triggers 405 error
      alert('Message sent to support@unityfunds.com. Thank you for contacting us!');
      contactForm.reset(); // Optionally clear the form fields after submission
    });
  }