import {test,expect} from '@playwright/test';

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
