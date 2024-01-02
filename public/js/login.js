async function submitForm() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const response = await fetch('/admin', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
  });

  if (response.ok) {
      // Successful login
      window.location.href = '/admin'; // Redirect to the admin page
  } else {
      // Display error message
      const errorMessage = await response.text();
      document.getElementById('error-message').innerText = errorMessage;
  }
}
