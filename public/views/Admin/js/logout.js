document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded event fired');
  document.getElementById('logout-button').addEventListener('click', logout);
});

async function logout() {
  console.log('Logout button clicked');
  try {
    const response = await fetch('/admin/logout', {
      method: 'POST',
    });

    if (response.ok) {
      // Successful logout
      console.log('Logout successful');
      window.location.href = '/login'; // Redirect to the login page
    } else {
      // Display error message
      const errorMessage = await response.text();
      console.error('Logout error:', errorMessage);
    }
  } catch (error) {
    console.error('Error during logout:', error);
  }
}
