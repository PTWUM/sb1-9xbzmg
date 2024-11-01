const archiver = require('archiver');
const fs = require('fs');
const path = require('path');

// Create output directory if it doesn't exist
const outputDir = path.join(__dirname, '../../dist');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Create a file to stream archive data to
const output = fs.createWriteStream(path.join(outputDir, 'serenity-lab-integration.zip'));
const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level
});

// Listen for all archive data to be written
output.on('close', () => {
  console.log(`Archive created successfully! Size: ${archive.pointer()} bytes`);
  console.log('Archive location: ' + path.join(outputDir, 'serenity-lab-integration.zip'));
});

// Handle warnings and errors
archive.on('warning', (err) => {
  if (err.code === 'ENOENT') {
    console.warn('Warning:', err);
  } else {
    throw err;
  }
});

archive.on('error', (err) => {
  throw err;
});

// Pipe archive data to the file
archive.pipe(output);

// Add files and directories
const filesToInclude = [
  'src',
  'package.json',
  'package-lock.json',
  '.env.example',
  'README.md'
];

// Add each file/directory
filesToInclude.forEach(item => {
  const itemPath = path.join(__dirname, '../../', item);
  
  if (fs.existsSync(itemPath)) {
    const stat = fs.statSync(itemPath);
    
    if (stat.isDirectory()) {
      // Add directory contents
      archive.directory(itemPath, item);
    } else {
      // Add file
      archive.file(itemPath, { name: item });
    }
  }
});

// Finalize the archive
archive.finalize();