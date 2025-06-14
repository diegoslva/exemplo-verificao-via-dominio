console.warn("Acesso negado. Domínio não autorizado.");

// Criar e adicionar botão de contato com suporte
(function() {
  const supportDiv = document.createElement('div');
  supportDiv.style.position = 'fixed';
  supportDiv.style.width  = '290px';
  supportDiv.style.bottom = '20px';
  supportDiv.style.right = '20px';
  supportDiv.style.backgroundColor = '#f8f9fa';
  supportDiv.style.padding = '15px';
  supportDiv.style.borderRadius = '5px';
  supportDiv.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
  supportDiv.style.zIndex = '9999';
  supportDiv.style.fontFamily = 'Arial, sans-serif';
  
  const message = document.createElement('p');
  message.textContent = 'domínio não está autorizado';
  message.style.margin = '0 0 10px 0';
  message.style.color = 'red';
  message.style.textAlign = 'center';
  message.style.textWrap = 'balance';
  message.style.lineHeight = '100%';
  
  const supportButton = document.createElement('button');
  supportButton.textContent = 'Entrar em contato';
  supportButton.style.backgroundColor = '#007bff';
  supportButton.style.color = 'white';
  supportButton.style.border = 'none';
  supportButton.style.padding = '8px 12px';
  supportButton.style.borderRadius = '4px';
  supportButton.style.cursor = 'pointer';
  supportButton.style.margin = '0 auto';
  supportButton.style.display = 'block';
  supportButton.onclick = function() {
    window.open('mailto:suporte@seudominio.com?subject=Solicitar acesso ' + window.location.hostname);
  };
  
  supportDiv.appendChild(message);
  supportDiv.appendChild(supportButton);
  document.body.appendChild(supportDiv);
})();