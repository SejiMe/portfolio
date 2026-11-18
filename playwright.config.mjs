import { defineConfig, devices } from '@playwright/test';
const baseURL = 'http://127.0.0.1:4327/portfolio/';
export default defineConfig({
  testDir:'./tests/browser', workers:3, timeout:35000,
  use:{baseURL, viewport:{width:1440,height:900}, trace:'retain-on-failure'},
  webServer:{command:'npm run preview -- --host 127.0.0.1 --port 4327',url:baseURL,reuseExistingServer:!process.env.CI},
  projects:[
    {name:'chromium',use:{browserName:'chromium'}},
    {name:'firefox',use:{browserName:'firefox'}},
    {name:'webkit',use:{browserName:'webkit'}},
    {name:'ios',use:{...devices['iPhone 13'],browserName:'webkit'}},
    {name:'android',use:{...devices['Pixel 7'],browserName:'chromium'}}
  ]
});
