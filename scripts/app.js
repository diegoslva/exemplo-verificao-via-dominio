console.log('script iniciado');

function showModal() {
  const modal = document.getElementById('acessibilidade-plugin-modal');
  if (modal) {
    modal.style.display = 'block';
  }
}


function setupModalEvents() {
  const modal = document.getElementById('acessibilidade-plugin-modal');
  const closeBtn = document.querySelector('.acessibilidade-close');
  

  if (closeBtn) {
    closeBtn.onclick = function() {
      modal.style.display = 'none';
    }
  }
  

  window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  }
  

  const altoContraste = document.getElementById('acessibilidade-alto-contraste');
  const fonteMaior = document.getElementById('acessibilidade-fonte-maior');
  
  if (altoContraste) {
    altoContraste.onchange = function() {
      if (this.checked) {
        document.body.classList.add('alto-contraste');
      } else {
        document.body.classList.remove('alto-contraste');
      }
    }
  }
  
  if (fonteMaior) {
    fonteMaior.onchange = function() {
      if (this.checked) {
        document.body.classList.add('fonte-maior');
      } else {
        document.body.classList.remove('fonte-maior');
      }
    }
  }
}


function addAccessibilityButton() {
  const button = document.createElement('button');
  button.id = 'acessibilidade-btn';
  button.innerHTML = 'Acessibilidade';
  button.style.position = 'fixed';
  button.style.bottom = '20px';
  button.style.right = '20px';
  button.style.zIndex = '9998';
  button.style.padding = '10px 15px';
  button.style.backgroundColor = '#4CAF50';
  button.style.color = 'white';
  button.style.border = 'none';
  button.style.borderRadius = '4px';
  button.style.cursor = 'pointer';
  button.onclick = showModal;
  
  document.body.appendChild(button);
}

document.addEventListener('DOMContentLoaded', function() {
  setupModalEvents();
  addAccessibilityButton();
});


if (document.readyState === 'complete' || document.readyState === 'interactive') {
  setTimeout(function() {
    setupModalEvents();
    addAccessibilityButton();
  }, 1);
}