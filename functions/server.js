const express = require('express');
const serverless = require('serverless-http');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Detecta se está rodando no Netlify ou localmente
const isNetlify = process.env.NETLIFY === 'true' || process.env.CONTEXT === 'production' || process.env.CONTEXT === 'deploy-preview';
const SCRIPTS_DIR = isNetlify 
  ? path.join(process.cwd(), 'scripts') 
  : path.join(__dirname, '../scripts');

const app = express();
const router = express.Router();

const allowedDomains = process.env.ALLOWED_DOMAINS
  ? process.env.ALLOWED_DOMAINS.split(',').map(d => d.trim())
  : [];


const checkDomain = (req) => {
  const referer = req.get('Referer') || '';
  const origin = req.get('Origin') || '';
  const requestSource = referer || origin;
  return allowedDomains.some(domain => requestSource.includes(domain));
};

router.get('/api', (req, res) => {
  console.log('API route accessed');
  const isAllowed = checkDomain(req);

  if (!isAllowed) {
    res.status(200).send('Acesso negado. Domínio não autorizado.');
    return;
  }

  const filePath = path.join(SCRIPTS_DIR, 'plugin.html');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Erro ao carregar o HTML');
      return;
    }

    res.set('Access-Control-Allow-Origin', '*');
    res.type('text/html').send(data);
  });
});

router.get('/api/script', (req, res) => {
  const isAllowed = checkDomain(req);

  if (!isAllowed) {
    const accessDeniedPath = path.join(SCRIPTS_DIR, 'access-denied.js');
    
    fs.readFile(accessDeniedPath, 'utf8', (err, data) => {
      if (err) {
        console.error('acesso negado ', err);
        res.status(500).send('Erro ao carregar script');
        return;
      }
      
      res.status(200).type('application/javascript').send(data);
    });
    return;
  }


  const htmlPath = path.join(SCRIPTS_DIR, 'plugin.html');
  const cssPath = path.join(SCRIPTS_DIR, 'plugin.css');
  const jsPath = path.join(SCRIPTS_DIR, 'app.js');

  try {
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    const cssContent = fs.readFileSync(cssPath, 'utf8');
    const jsContent = fs.readFileSync(jsPath, 'utf8');


    const templatePath = path.join(SCRIPTS_DIR, 'template.js');
    const templateContent = fs.readFileSync(templatePath, 'utf8');
    
    const combinedScript = templateContent
      .replace('{{CSS_CONTENT}}', JSON.stringify(cssContent))
      .replace('{{HTML_CONTENT}}', JSON.stringify(htmlContent))
      .replace('{{JS_CONTENT}}', jsContent);


    res.set('Access-Control-Allow-Origin', '*');
    res.type('application/javascript').send(combinedScript);
  } catch (err) {
    console.error('Erro ao carregar arquivos:', err);
    res.status(500).send('Erro ao carregar');
  }
});

router.get('/api/styles', (req, res) => {
  const isAllowed = checkDomain(req);

  if (!isAllowed) {
    res.status(200).send('Domínio não autorizado.');
    return;
  }

  const filePath = path.join(SCRIPTS_DIR, 'plugin.css');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Erro ao carregar o CSS');
      return;
    }

    res.set('Access-Control-Allow-Origin', '*');
    res.type('text/css').send(data);
  });
});

router.get('/', (req, res) => {
  res.send('API ativa');
});

app.use('/', router);
app.use('/.netlify/functions/server', router);

module.exports.handler = serverless(app);
