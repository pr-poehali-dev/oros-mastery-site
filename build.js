#!/usr/bin/env node

/**
 * Кросс-платформенный скрипт для сборки проекта с автоматической генерацией sitemap.xml
 * Использование: node build.js
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Цвета для консоли
const colors = {
  reset: '\x1b[0m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  green: '\x1b[32m',
  red: '\x1b[31m',
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function runCommand(command, args = [], cwd = __dirname) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      stdio: 'inherit',
      shell: true,
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });

    child.on('error', (error) => {
      reject(error);
    });
  });
}

async function build() {
  try {
    log('🚀 Starting build process...', colors.cyan);
    console.log('');

    // Шаг 1: Генерация sitemap.xml
    log('📍 Step 1: Generating sitemap.xml...', colors.yellow);
    await runCommand('node', ['scripts/generate-sitemap.js']);
    console.log('');

    // Шаг 2: Сборка проекта
    log('📍 Step 2: Building project...', colors.yellow);
    await runCommand('npm', ['run', 'build']);
    console.log('');

    log('✅ Build completed successfully!', colors.green);
    log('📦 Your project is ready in the dist/ folder', colors.green);
  } catch (error) {
    console.log('');
    log(`❌ Build failed: ${error.message}`, colors.red);
    process.exit(1);
  }
}

build();
