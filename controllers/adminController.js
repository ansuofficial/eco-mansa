// AdminController.js
const path = require('path');
const fs = require('fs/promises');

exports.renderAdminPage= (req, res) => {
  // Check if the user is authenticated
  if (req.session.user) {
    // User is authenticated, render the admin.html page
    const adminHtmlPath = path.join(__dirname, '..', 'public', 'views', 'admin.html');
    fs.readFile(adminHtmlPath, 'utf-8')
      .then(adminHtmlContent => {
        res.status(200).send(adminHtmlContent);
      })
      .catch(error => {
        console.error('Error reading admin.html:', error);
        res.status(500).send('Internal Server Error');
      });
  } else {
    // User is not authenticated, redirect to the login page or send an unauthorized response
    res.redirect('/login'); // You can customize the login page URL
    // or res.status(401).send('Unauthorized'); // Send unauthorized response
  }
}