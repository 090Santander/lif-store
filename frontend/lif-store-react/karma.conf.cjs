const fs = require('fs');
const esbuild = require('esbuild');

// 1. Detección automática del navegador (Brave / Chromium / Chrome) en Arch/CachyOS
if (!process.env.CHROME_BIN) {
  const candidatos = [
    '/usr/bin/brave',
    '/usr/bin/brave-browser',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/google-chrome',
  ];
  const encontrado = candidatos.find((ruta) => fs.existsSync(ruta));
  if (encontrado) process.env.CHROME_BIN = encontrado;
}

// 2. Instanciador de cobertura
let instrumenter = null;
try {
  const { createInstrumenter } = require('istanbul-lib-instrument');
  instrumenter = createInstrumenter({
    esModules: true,
    compact: false,
    produceSourceMap: true
  });
} catch (e) {
  // Manejo defensivo
}

// 3. Plugin universal para interceptar cualquier asset (imágenes y CSS)
const assetStubPlugin = {
  name: 'asset-stub',
  setup(build) {
    const assetExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.ico', '.css', '.scss', '.sass', '.less'];

    build.onResolve({ filter: /.*/ }, (args) => {
      const cleanPath = args.path.split('?')[0].toLowerCase();
      if (assetExtensions.some(ext => cleanPath.endsWith(ext))) {
        return {
          path: args.path,
          namespace: 'asset-stub'
        };
      }
      return null;
    });

    build.onLoad({ filter: /.*/, namespace: 'asset-stub' }, () => ({
      contents: 'export default "test-file-stub";',
      loader: 'js'
    }));
  }
};

// 4. Plugin de cobertura exclusivo para componentes del proyecto
const cleanCoveragePlugin = {
  name: 'clean-coverage-transformer',
  setup(build) {
    build.onLoad({ filter: /\.(tsx|ts)$/ }, async (args) => {
      if (args.path.includes('.spec.') || args.path.includes('node_modules') || args.path.includes('setupTests')) {
        return null;
      }

      const sourceCode = await fs.promises.readFile(args.path, 'utf8');

      const transformed = esbuild.transformSync(sourceCode, {
        loader: args.path.endsWith('.tsx') ? 'tsx' : 'ts',
        jsx: 'automatic',
        target: 'es2020',
        sourcemap: 'inline',
        sourcefile: args.path
      });

      let finalCode = transformed.code;
      if (instrumenter) {
        try {
          finalCode = instrumenter.instrumentSync(transformed.code, args.path);
        } catch (err) {
          // Conservar código transpilado si falla instrumentación
        }
      }

      return {
        contents: finalCode,
        loader: 'js'
      };
    });
  }
};

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],

    files: [
      { pattern: 'src/setupTests.ts', watched: false },
      { pattern: 'src/**/*.spec.ts', watched: false },
      { pattern: 'src/**/*.spec.tsx', watched: false }
    ],

    preprocessors: {
      'src/setupTests.ts': ['esbuild'],
      'src/**/*.spec.ts': ['esbuild'],
      'src/**/*.spec.tsx': ['esbuild']
    },

    esbuild: {
      jsx: 'automatic',
      target: 'es2020',
      sourcemap: 'inline',
      loader: { '.ts': 'ts', '.tsx': 'tsx' },
      resolveExtensions: ['.tsx', '.ts', '.jsx', '.js', '.json', '.mjs', '.cjs'],
      define: {
        'process.env.NODE_ENV': JSON.stringify('development')
      },
      plugins: [assetStubPlugin, cleanCoveragePlugin]
    },

    reporters: ['progress', 'coverage'],

    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        { type: 'html' },
        { type: 'text' },
        { type: 'text-summary' }
      ],
      check: {
        global: { statements: 80, branches: 80, functions: 80, lines: 80 }
      }
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,

    browsers: ['ChromeHeadlessNoSandbox'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
      }
    },

    singleRun: true
  });
};