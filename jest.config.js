module.exports = {
  testPathIgnorePatterns: ["/node_modules", "/.next/"],
  setupFilesAfterEnv: [
    "<rootDir>/src/tests/setupTests.ts"
  ],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest"// Converte os arquivos typescript para uma maneira que o jest consiga entender.
  },

  // Lida com as importacoes de estilos.
  moduleNameMapper: {
    "\\.(scss|css|sass)$": "identity-obj-proxy"
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.tsx",
    "!src/**/*.spec.tsx", // Arquivos excluidos
    "!src/**/*_app.tsx", // Arquivos excluidos
    "!src/**/*_document.tsx" // Arquivos excluidos
  ],
  coverageReporters: ["lcov", "json"]
};