const fs = require('fs');
const path = require('path');

const scriptTag = '<script src="/dashboard-console-capture.js"></script>';

function injectScript(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (content.includes('dashboard-console-capture.js')) {
    console.log(`✓ Script already present in ${filePath}`);
    return;
  }
  
  if (content.includes('</head>')) {
    content = content.replace('</head>', `  ${scriptTag}\n  </head>`);
  } else if (content.includes('<body>')) {
    content = content.replace('<body>', `<body>\n  ${scriptTag}`);
  } else {
    console.log(`⚠ Could not find injection point in ${filePath}`);
    return;
  }
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✓ Injected script into ${filePath}`);
}

const outDir = path.join(process.cwd(), '.next', 'server', 'app');

function processDirectory(dir) {
  if (!fs.existsSync(dir)) {
    return;
  }
  
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (file.endsWith('.html')) {
      injectScript(filePath);
    }
  });
}

console.log('Starting console capture script injection...');
processDirectory(outDir);
console.log('Console capture script injection complete!');