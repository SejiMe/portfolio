import {test,expect} from '@playwright/test';
import {createServer} from 'node:http';

const splash = page => page.locator('#entrance');
async function usable(page) {
  await expect(splash(page)).toBeHidden();
  await expect(page.locator('#site-shell')).toHaveJSProperty('inert',false);
  await expect(page.getByRole('link',{name:'Sej — home'})).toHaveCSS('opacity','1');
}
async function captured(page, info, name) {
  await page.evaluate(()=>document.fonts.ready);
  const file=info.outputPath(name+'.png');
  await page.screenshot({path:file,animations:'allow'});
  await info.attach(name,{path:file,contentType:'image/png'});
}

test('the splash is visible at first paint before the homepage module loads',async({page},info)=>{
  test.skip(info.project.name!=='chromium','Uses the Chromium first-contentful-paint entry');
  let release;
  let intercepted=false;
  const gate=new Promise(resolve=>{release=resolve;});
  const entry=/\/_astro\/hoisted\.[^/]+\.js$/;
  await page.route(entry,async route=>{intercepted=true;await gate;await route.continue().catch(()=>{});});
  await page.goto('./',{waitUntil:'commit'});
  try {
    await expect.poll(()=>intercepted).toBe(true);
    await expect.poll(()=>page.evaluate(()=>performance.getEntriesByName('first-contentful-paint').length)).toBe(1);
    await expect(splash(page)).toBeVisible({timeout:1000});
    expect(await page.evaluate(()=>document.elementFromPoint(innerWidth/2,innerHeight/2)?.closest('#entrance')?.id)).toBe('entrance');
  } finally {release();}
  await expect(splash(page)).toHaveAttribute('data-state','playing');
  await usable(page);
  await page.reload();
  await usable(page);
});

test('the splash watchdog releases the homepage without its module',async({page})=>{
  const epoch=new Date('2026-03-01T12:00:00Z');
  await page.clock.install({time:epoch});
  await page.clock.pauseAt(new Date(+epoch+1000));
  await page.route(/\/_astro\/hoisted\.[^/]+\.js$/,route=>route.abort());
  await page.goto('./',{waitUntil:'domcontentloaded'});
  await expect(splash(page)).toBeVisible({timeout:1000});
  await expect(page.locator('#site-shell')).toHaveJSProperty('inert',true);
  await page.clock.runFor(3000);
  await usable(page);
});

test('early splash dismissal restores focus after the homepage parses',async({page,baseURL})=>{
  const site=new URL(baseURL);
  const html=await (await fetch(site)).text();
  const split=html.indexOf('<header class="mast"');
  expect(split).toBeGreaterThan(0);
  let resume;
  const gate=new Promise(resolve=>{resume=resolve;});
  const proxy=createServer(async (req,res)=>{
    try {
      if (req.url===site.pathname) {
        res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
        res.write(html.slice(0,split));
        await gate;
        res.end(html.slice(split));
      } else {
        const target=new URL(req.url,site);
        if (target.origin!==site.origin) {res.writeHead(404).end();return;}
        const asset=await fetch(target,{redirect:'error'});
        res.writeHead(asset.status,{'Content-Type':asset.headers.get('content-type')||'application/octet-stream'});
        res.end(Buffer.from(await asset.arrayBuffer()));
      }
    } catch {res.destroy();}
  });
  await new Promise(resolve=>proxy.listen(0,'127.0.0.1',resolve));
  try {
    await page.goto(`http://127.0.0.1:${proxy.address().port}${new URL(baseURL).pathname}`,{waitUntil:'commit'});
    await expect(page.getByRole('button',{name:'Skip intro'})).toBeFocused();
    const heading=page.locator('#intro h1');
    await expect(heading).toHaveCount(0);
    await page.keyboard.press('Escape');
    await expect(splash(page)).toBeHidden();
    await expect(page.locator('#site-shell')).toHaveJSProperty('inert',false);
    resume();
    await expect(heading).toBeFocused();
  } finally {
    resume();
    proxy.closeAllConnections();
    await new Promise(resolve=>proxy.close(resolve));
  }
});

test('emblem and lettering endpoints, dismissal, refresh and history',async({page},info)=>{
  const epoch=new Date('2026-03-01T12:00:00Z');
  await page.clock.install({time:epoch});
  await page.clock.pauseAt(new Date(+epoch+1000));
  await page.goto('./');
  await expect(splash(page)).toBeVisible();
  await expect(splash(page)).toHaveAttribute('data-state','playing');
  const path=page.locator('[data-ribbon=s]');
  const start=await path.getAttribute('d');
  if(info.project.name==='chromium') await captured(page,info,'splash-emblem');
  await page.clock.runFor(1270);
  await expect(path).not.toHaveAttribute('d',start);
  if(info.project.name==='chromium') await captured(page,info,'splash-lettering');
  await page.clock.runFor(800);
  await usable(page);
  await page.reload();
  await usable(page);
  await page.goto('about/');
  await expect(page.getByRole('heading',{name:'Education'})).toBeVisible();
  await page.goBack();
  await usable(page);
});

for(const method of ['Skip intro','Escape','reduced motion']) {
  test('dismiss through '+method,async({page})=>{
    await page.route('**/ribbon-motion*.js',async route=>{await new Promise(r=>setTimeout(r,600));await route.continue().catch(()=>{});});
    await page.goto('./',{waitUntil:'domcontentloaded'});
    await expect(splash(page)).toBeVisible();
    if(method==='Escape') await page.keyboard.press('Escape');
    else if(method==='reduced motion') await page.emulateMedia({reducedMotion:'reduce'});
    else await page.getByRole('button',{name:method}).click();
    await usable(page);
    await expect(page.locator('#intro h1')).toBeFocused();
    await expect.poll(()=>page.evaluate(()=>sessionStorage.getItem('sej:intro'))).toBe('1');
  });
}

test('animation failure and timeout release the page',async({page})=>{
  await page.route('**/ribbon-motion*.js',route=>route.abort());
  await page.goto('./');
  await usable(page);
  await page.evaluate(()=>sessionStorage.clear());
  await page.unrouteAll();
  await page.route('**/ribbon-motion*.js',route=>route.fulfill({contentType:'text/javascript',body:'export function animateEntrance(){return {kill(){}}}'}));
  await page.goto('./');
  await expect(splash(page)).toBeVisible();
  await usable(page);
});

test('blocked storage, reduced motion and no JavaScript retain access',async({page,browser,baseURL})=>{
  await page.addInitScript(()=>Object.defineProperty(window,'sessionStorage',{get(){throw Error('blocked')}}));
  await page.goto('./');
  await usable(page);
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('./#projects');
  await expect(page.locator('#position')).toHaveText('02 / 05');
  const fallback=await browser.newContext({javaScriptEnabled:false,baseURL});
  try {
    const plain=await fallback.newPage();
    await plain.goto('./');
    await expect(plain.locator('#entrance')).toBeHidden();
    await plain.locator('#writing a').last().click();
    await expect(plain).toHaveURL(/\/posts\/$/);
  } finally {await fallback.close();}
});

test('chapters, gestures, header, themes and detail-page search',async({page,isMobile},info)=>{
  await page.emulateMedia({colorScheme:'dark'});
  await page.goto('./#intro');
  await usable(page);
  await expect(page.locator('html')).toHaveAttribute('data-theme','dark');
  if(info.project.name==='chromium' || info.project.name==='ios') await captured(page,info,isMobile?'mobile-home':'desktop-dark');
  await page.getByRole('button',{name:'Toggle color theme'}).click();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme','light');
  if(info.project.name==='chromium') await captured(page,info,'desktop-light');
  if(isMobile){
    const hero=page.locator('#intro');
    await hero.evaluate(el=>el.scrollTop=el.scrollHeight);
    if(info.project.name==='android'){
      const touch=await page.context().newCDPSession(page);
      for(const [type,y] of [['touchStart',300],['touchMove',240],['touchMove',170],['touchEnd',0]]) {
        await touch.send('Input.dispatchTouchEvent',{type,touchPoints:y?[{x:100,y}]:[]});
      }
      await touch.detach();
    } else {
      await hero.dispatchEvent('touchstart',{touches:[{clientX:100,clientY:300}]});
      await hero.dispatchEvent('touchmove',{touches:[{clientX:100,clientY:190}]});
      await hero.dispatchEvent('touchend',{changedTouches:[{clientX:100,clientY:160}]});
    }
    await page.locator('.mobile-nav summary').click();
    if(info.project.name==='ios') await captured(page,info,'mobile-menu');
    await page.locator('.mobile-nav summary').click();
  } else {
    await page.mouse.move(320,350);
    await page.mouse.wheel(0,180);
  }
  await expect(page).toHaveURL(/#work$/);
  await page.keyboard.press('ArrowRight');
  await expect(page).toHaveURL(/#about$/);
  await page.getByRole('button',{name:'Previous chapter'}).click();
  await expect(page).toHaveURL(/#work$/);
  await page.goto('./#blog');
  await expect(page.locator('#position')).toHaveText('04 / 05');
  for(const [term,kind] of [['Wellcare','projects'],['Reflection','posts']]){
    await page.getByRole('button',{name:'Search portfolio'}).click();
    await page.getByRole('searchbox').fill(term);
    const result=page.getByRole('dialog').getByRole('link').first();
    const title=await result.innerText();
    await result.click();
    await expect(page).toHaveURL(new RegExp('/'+kind+'/'));
    await expect(page.getByRole('heading',{name:title,exact:true}).first()).toBeVisible();
    if(term==='Wellcare' && info.project.name==='chromium') await captured(page,info,'project-detail');
  }
});
