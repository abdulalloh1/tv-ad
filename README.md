# Sale of TV advertising (Vue 3 + TypeScript + Vite)

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn dev
```

### Compiles and minifies for production
```
yarn build
```

Code Style Rules:

FOLDERS:
- components
   1. workspace. Components with business logic
      - create and arrange by folder components based on page.
   2. UI
      - use **App** prefix for new UI components
- mocks
   1. mock json files  
- Store. Vuex files seperated to modules

To load svg file replies package 'external-svg-load'. 
   - use 
      ```<svg data-src="*.svg"/>```