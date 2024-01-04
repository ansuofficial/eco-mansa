const userModel = require('../model/UserModel');


exports.handleLogin = async (req, res) => {
  const { username, password } = req.body;

  // Check if the entered credentials are valid
  const foundUser = userModel.findByCredentials(username, password);

  if (foundUser) {
    // Successful login
    req.session.user = foundUser; // Store user information in the session
    res.redirect('/admin');
  } else {
    // Incorrect credentials
    res.status(401).send('Incorrect credentials. Please try again.');
  }
};

exports.handleLogout=(req, res) => {
  // Clear the user's session on logout
  req.session.destroy(err => {
    if (err) {
      console.error('Error destroying session:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.redirect('/login'); // Redirect to the login page after logout
    }
  })
}

