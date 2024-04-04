document.addEventListener('DOMContentLoaded', function() {
  const walletContainer = document.querySelector('.wallet-container');
  const sendContainer = document.querySelector('.send-container');
  const sendButton = document.querySelector('.send-button');
  const cancelButton = document.querySelector('.cancel-button');

  sendButton.addEventListener('click', (event) => {
    event.preventDefault();
    walletContainer.style.display = 'none';
    sendContainer.style.display = 'block';
  });

  cancelButton.addEventListener('click', (event) => {
    event.preventDefault();
    sendContainer.style.display = 'none';
    walletContainer.style.display = 'block';
  });
});
