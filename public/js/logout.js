const logout = async () => {
  console.log('logout');

  // Make a POST request to destroy the session on the back end
  const response = await fetch('/user/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  console.log('logout');

  if (response.ok) {
    // If successfully logged out, redirect to the login page
    document.location.replace('/login');
  } else {
    alert(response.statusText);
  }
};
console.log('logout');


document.querySelector('.logout-form').addEventListener('submit', logout);