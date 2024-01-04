async function submitForm() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const response = await fetch('/admin/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok) {
    // Successful login
    window.location.href = '/admin'; // Redirect to the admin page

    // If you need to perform actions after the redirection, you can do so here
    // For example, you may want to fetch additional data or initialize some functionality
    // ...

  } else {
    // Display error message
    const errorMessage = await response.text();
    document.getElementById('error-message').innerText = errorMessage;
  }
}
