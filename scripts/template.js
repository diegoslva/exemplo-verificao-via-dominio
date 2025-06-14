// Injetar CSS
(function() {
  const style = document.createElement('style');
  style.textContent = {{CSS_CONTENT}};
  document.head.appendChild(style);


  const div = document.createElement('div');
  div.innerHTML = {{HTML_CONTENT}};
  document.body.appendChild(div);
})();


{{JS_CONTENT}}