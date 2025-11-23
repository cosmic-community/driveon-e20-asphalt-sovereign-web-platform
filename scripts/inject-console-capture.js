const fs = require('fs');
const path = require('path');

const scriptTag = '<script src="/dashboard-console-capture.js"></script>';

function injectScript(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    if (content.includes('dashboard-console-capture.js')) {
      console.log(`✓ ${filePath} already has console capture script`);
      return;
    }
    
    if (content.includes('</head>')) {
      content = content.replace('</head>', `  ${scriptTag}\n</head>`);
    } else if (content.includes('</body>')) {
      content = content.replace('</body>', `  ${scriptTag}\n</body>`);
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Injected console capture script into ${filePath}`);
  } catch (error) {
    console.error(`✗ Error processing ${filePath}:`, error.message);
  }
}

function findHtmlFiles(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findHtmlFiles(filePath);
    } else if (file.endsWith('.html')) {
      injectScript(filePath);
    }
  });
}

const outputDir = path.join(process.cwd(), '.next', 'server', 'app');
if (fs.existsSync(outputDir)) {
  console.log('Injecting console capture script into HTML files...\n');
  findHtmlFiles(outputDir);
  console.log('\n✓ Console capture injection complete');
} else {
  console.log('Output directory not found. Run build first.');
}