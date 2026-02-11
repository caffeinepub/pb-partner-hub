#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync, mkdirSync, copyFileSync, readdirSync, statSync, rmSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const FRONTEND_ROOT = join(__dirname, '..');
const BUILD_DIR = join(FRONTEND_ROOT, 'dist');
const ARTIFACTS_DIR = join(FRONTEND_ROOT, 'artifacts');
const OUTPUT_ZIP = join(ARTIFACTS_DIR, 'hostinger-site.zip');
const DIST_ZIP = join(BUILD_DIR, 'hostinger-site.zip');
const HTACCESS_SOURCE = join(FRONTEND_ROOT, 'public', '.htaccess');

console.log('🚀 Starting Hostinger ZIP build process...\n');

// Step 1: Run the production build
console.log('📦 Step 1: Building production bundle...');
try {
  execSync('npm run build:skip-bindings', {
    cwd: FRONTEND_ROOT,
    stdio: 'inherit'
  });
  console.log('✅ Production build completed\n');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

// Step 2: Verify build output exists
if (!existsSync(BUILD_DIR)) {
  console.error('❌ Build directory not found:', BUILD_DIR);
  process.exit(1);
}

console.log('📁 Step 2: Verifying build output...');
const buildFiles = readdirSync(BUILD_DIR);
console.log(`   Found ${buildFiles.length} files/folders in build directory`);

// Check for index.html
if (!buildFiles.includes('index.html')) {
  console.error('❌ index.html not found in build output');
  process.exit(1);
}
console.log('✅ index.html found\n');

// Step 3: Ensure .htaccess is in the build output (REQUIRED)
console.log('🔧 Step 3: Ensuring .htaccess is in build output...');
const htaccessDest = join(BUILD_DIR, '.htaccess');

if (!existsSync(HTACCESS_SOURCE)) {
  console.error('❌ CRITICAL: .htaccess not found at:', HTACCESS_SOURCE);
  console.error('   The .htaccess file is required for client-side routing to work on Hostinger.');
  console.error('   Please ensure frontend/public/.htaccess exists before building.');
  process.exit(1);
}

try {
  copyFileSync(HTACCESS_SOURCE, htaccessDest);
  console.log('✅ .htaccess copied to build directory\n');
} catch (error) {
  console.error('❌ Failed to copy .htaccess:', error.message);
  process.exit(1);
}

// Verify .htaccess was copied successfully
if (!existsSync(htaccessDest)) {
  console.error('❌ .htaccess was not successfully copied to build directory');
  process.exit(1);
}

// Step 4: Create artifacts directory
if (!existsSync(ARTIFACTS_DIR)) {
  mkdirSync(ARTIFACTS_DIR, { recursive: true });
  console.log('📁 Created artifacts directory\n');
}

// Step 5: Create ZIP file
console.log('🗜️  Step 4: Creating ZIP archive...');

try {
  // Remove existing ZIP if present (cross-platform)
  if (existsSync(OUTPUT_ZIP)) {
    try {
      rmSync(OUTPUT_ZIP, { force: true });
      console.log('   Removed existing ZIP file');
    } catch (rmError) {
      console.warn('   Warning: Could not remove existing ZIP:', rmError.message);
    }
  }

  // Detect OS and use appropriate zip command
  const isWindows = process.platform === 'win32';
  
  if (isWindows) {
    // Windows: Use PowerShell Compress-Archive
    const psCommand = `Compress-Archive -Path "${BUILD_DIR}\\*" -DestinationPath "${OUTPUT_ZIP}" -Force`;
    execSync(`powershell -Command "${psCommand}"`, {
      cwd: FRONTEND_ROOT,
      stdio: 'inherit'
    });
  } else {
    // Unix/Linux/Mac: Use zip command
    // -r: recursive, -q: quiet, -9: maximum compression
    execSync(`cd "${BUILD_DIR}" && zip -r -q -9 "${OUTPUT_ZIP}" .`, {
      cwd: FRONTEND_ROOT,
      shell: '/bin/bash'
    });
  }

  console.log('✅ ZIP archive created successfully\n');
} catch (error) {
  console.error('❌ ZIP creation failed:', error.message);
  console.error('\nTroubleshooting:');
  console.error('  - On Windows: Ensure PowerShell is available');
  console.error('  - On Unix/Mac: Ensure zip command is installed (apt-get install zip / brew install zip)');
  process.exit(1);
}

// Step 6: Verify ZIP was created and show stats
if (!existsSync(OUTPUT_ZIP)) {
  console.error('❌ ZIP file was not created at:', OUTPUT_ZIP);
  process.exit(1);
}

const stats = statSync(OUTPUT_ZIP);
const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);

console.log('📊 Verifying ZIP archive contents...\n');

// Step 7: Strict verification that index.html and .htaccess are at archive root
try {
  const isWindows = process.platform === 'win32';
  let fileList = [];
  
  if (isWindows) {
    // Windows: Use PowerShell to get just filenames at root
    const psCommand = `Add-Type -AssemblyName System.IO.Compression.FileSystem; [System.IO.Compression.ZipFile]::OpenRead('${OUTPUT_ZIP}').Entries | ForEach-Object { $_.FullName }`;
    const zipContents = execSync(`powershell -Command "${psCommand}"`, {
      cwd: FRONTEND_ROOT,
      encoding: 'utf8'
    });
    fileList = zipContents.split('\n').map(line => line.trim()).filter(line => line);
  } else {
    // Unix/Linux/Mac: Use zipinfo to get clean filename list
    try {
      const zipContents = execSync(`zipinfo -1 "${OUTPUT_ZIP}"`, {
        cwd: FRONTEND_ROOT,
        encoding: 'utf8'
      });
      fileList = zipContents.split('\n').map(line => line.trim()).filter(line => line);
    } catch (zipinfoError) {
      // Fallback to unzip -Z1 if zipinfo not available
      const zipContents = execSync(`unzip -Z1 "${OUTPUT_ZIP}"`, {
        cwd: FRONTEND_ROOT,
        encoding: 'utf8'
      });
      fileList = zipContents.split('\n').map(line => line.trim()).filter(line => line);
    }
  }

  // Strict check: files must be exactly "index.html" and ".htaccess" (no path prefix)
  const hasIndexAtRoot = fileList.includes('index.html');
  const hasHtaccessAtRoot = fileList.includes('.htaccess');

  if (!hasIndexAtRoot) {
    console.error('❌ VERIFICATION FAILED: index.html is not at the root of the ZIP archive');
    console.error('   The ZIP must contain index.html directly at the root level (no folder prefix).');
    console.error('   Current ZIP root-level files:');
    const rootFiles = fileList.filter(f => !f.includes('/') && !f.includes('\\'));
    console.error('   ' + rootFiles.slice(0, 20).join(', '));
    process.exit(1);
  }

  if (!hasHtaccessAtRoot) {
    console.error('❌ VERIFICATION FAILED: .htaccess is not at the root of the ZIP archive');
    console.error('   The ZIP must contain .htaccess directly at the root level for SPA routing.');
    console.error('   Current ZIP root-level files:');
    const rootFiles = fileList.filter(f => !f.includes('/') && !f.includes('\\'));
    console.error('   ' + rootFiles.slice(0, 20).join(', '));
    process.exit(1);
  }

  console.log('✅ Verification passed: index.html found at archive root');
  console.log('✅ Verification passed: .htaccess found at archive root\n');

} catch (error) {
  console.error('❌ CRITICAL: ZIP verification failed:', error.message);
  console.error('   Could not verify that index.html and .htaccess are at the archive root.');
  console.error('   This is required for proper deployment to Hostinger.');
  console.error('\nPrerequisites check:');
  console.error('  - Windows: PowerShell must be available');
  console.error('  - Unix/Mac: zipinfo or unzip command must be installed');
  process.exit(1);
}

// Step 8: Copy ZIP to dist directory for deployment artifact exposure (CRITICAL)
console.log('📦 Step 5: Copying ZIP to dist directory for artifact distribution...');

try {
  copyFileSync(OUTPUT_ZIP, DIST_ZIP);
  
  // Verify the copy succeeded
  if (!existsSync(DIST_ZIP)) {
    throw new Error('Copy operation completed but file does not exist at destination');
  }
  
  const distStats = statSync(DIST_ZIP);
  if (distStats.size !== stats.size) {
    throw new Error(`File size mismatch: source ${stats.size} bytes, destination ${distStats.size} bytes`);
  }
  
  console.log('✅ ZIP copied to dist directory as downloadable artifact\n');
} catch (error) {
  console.error('❌ CRITICAL: Failed to copy ZIP to dist directory:', error.message);
  console.error('   The ZIP must be available at:', DIST_ZIP);
  console.error('   This is required for the build artifact to be downloadable.');
  process.exit(1);
}

console.log('✨ Build complete!\n');
console.log('📊 Summary:');
console.log(`   ZIP Location (artifacts): ${OUTPUT_ZIP}`);
console.log(`   ZIP Location (dist): ${DIST_ZIP}`);
console.log(`   ZIP Size: ${sizeInMB} MB`);
console.log(`   Build Directory: ${BUILD_DIR}`);
console.log(`   index.html: ✅ At archive root`);
console.log(`   .htaccess: ✅ At archive root`);
console.log('\n🎉 Your website is ready for Hostinger upload!');
console.log('\n📖 Next steps:');
console.log('   1. Download hostinger-site.zip from either location:');
console.log('      - frontend/artifacts/hostinger-site.zip');
console.log('      - frontend/dist/hostinger-site.zip (build artifact)');
console.log('   2. Log in to Hostinger hPanel');
console.log('   3. Go to File Manager → public_html');
console.log('   4. Upload hostinger-site.zip');
console.log('   5. Right-click the ZIP → Extract');
console.log('   6. Delete old files if needed');
console.log('   7. Visit your domain to verify\n');
