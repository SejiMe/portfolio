import {test,expect} from '@playwright/test';

async function capture(page,info,name){
 await page.evaluate(()=>document.fonts.ready);
 const path=info.outputPath(name+'.png');
 await page.screenshot({path,fullPage:false});
 await info.attach(name,{path,contentType:'image/png'});
}
test('navigation has one underline and header fades with safe focus overrides',async({page,isMobile})=>{
 await page.goto('./#intro');
 const nav=page.locator(isMobile?'.mobile-nav nav':'.desktop-nav');
 await expect(nav.locator('a').first()).toHaveText('Intro');
 if(!isMobile){
  const link=nav.locator('a').first();
  await link.hover();
  expect(await link.evaluate(el=>getComputedStyle(el).textDecorationLine)).toBe('none');
 }
 await page.mouse.move(10,400);
 await page.locator('.exhibition').dispatchEvent('wheel',{deltaY:100});
 await expect(page.locator('.mast')).toHaveCSS('opacity','0.7');
 await expect(page.locator('.mast')).toHaveCSS('opacity','1');
 expect(await page.locator('.mast').evaluate(el=>el.getBoundingClientRect().top)).toBe(0);
});

test('GSAP galleries regroup, navigate and preserve vertical details',async({page,isMobile},info)=>{
 await page.goto('projects/');
 const gallery=page.locator('[data-gallery]');
 await expect(gallery).toHaveClass(/gallery-enhanced/);
 const size=isMobile?'1':'4';
 await expect(gallery).toHaveAttribute('data-size',size);
 if(!isMobile) {
   const rail=page.locator('.gallery-viewport');
   await rail.evaluate(el=>el.scrollTop=el.scrollHeight);
   await rail.hover();
   await page.mouse.wheel(0,180);
   await expect(gallery).toHaveAttribute('data-page','1');
   await page.getByRole('button',{name:'Previous gallery page'}).click();
   await page.waitForTimeout(200);
   await rail.hover();
   await page.mouse.wheel(180,0);
   await expect(gallery).toHaveAttribute('data-page','1');
   await page.getByRole('button',{name:'Previous gallery page'}).click();
 }
 await page.getByRole('button',{name:'Next gallery page'}).click();
 await expect(gallery).toHaveAttribute('data-page','1');
 await page.getByRole('button',{name:'Previous gallery page'}).click();
 const viewport=page.locator('.gallery-viewport');
 await viewport.focus();
 await page.keyboard.press('ArrowRight');
 await expect(gallery).toHaveAttribute('data-page','1');
 if(!isMobile){
   await page.setViewportSize({width:800,height:950});
   await expect(gallery).toHaveAttribute('data-size','2');
   await expect(gallery).toHaveAttribute('data-page','2');
   await page.setViewportSize({width:1440,height:1000});
   await expect(gallery).toHaveAttribute('data-page','1');
 } else if(info.project.name==='android'){
   await page.getByRole('button',{name:'Previous gallery page'}).click();
   await viewport.evaluate(el=>el.scrollTop=el.scrollHeight);
   const cdp=await page.context().newCDPSession(page);
   for(const [type,y] of [['touchStart',430],['touchMove',370],['touchMove',300],['touchEnd',0]]){
     await cdp.send('Input.dispatchTouchEvent',{type,touchPoints:y?[{x:100,y}]:[]});
   }
   await cdp.detach();
   await expect(gallery).toHaveAttribute('data-page','1');
 }
 await page.emulateMedia({colorScheme:'dark'});
 await page.getByRole('button',{name:'Toggle color theme'}).click();
 if(info.project.name==='chromium' || info.project.name==='ios') await capture(page,info,'projects-grid');
 const detail=page.locator('.gallery-page:not([inert]) a').first();
 const href=await detail.getAttribute('href');
 await detail.click();
 await expect(page).toHaveURL(new RegExp(href));
 await expect(page.locator('.reading')).toBeVisible();
 await expect(page.locator('[data-gallery]')).toHaveCount(0);
 if(!isMobile) await page.setViewportSize({width:800,height:950});
 await page.goto('posts/');
 await expect(gallery).toHaveClass(/gallery-enhanced/);
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.getByRole('button',{name:'Next gallery page'}).click();
 await expect(gallery).toHaveAttribute('data-page','1');
 if(info.project.name==='chromium') await capture(page,info,'writing-grid');
});

test('search animation, themed scrollbar and resume-backed content',async({page},info)=>{
 await page.goto('./#intro');
 await page.getByRole('button',{name:'Search portfolio'}).click();
 const dialog=page.getByRole('dialog');
 await expect(dialog).toHaveCSS('animation-name','search-in');
 const scrollbar = await dialog.locator('.search-results').evaluate(el=>({
   width:getComputedStyle(el).scrollbarWidth,
   color:getComputedStyle(el).scrollbarColor,
   scrollable:el.scrollHeight>el.clientHeight
 }));
 // Firefox headless on this host suppresses native scrollbars even for inline width:auto.
 if(info.project.name==='firefox'){
   expect(['thin','none']).toContain(scrollbar.width);
   expect(scrollbar.color).not.toBe('auto');
 } else expect(scrollbar.width).toBe('thin');
 expect(scrollbar.scrollable).toBe(true);
 await page.getByRole('searchbox').fill('Meta Chatter');
 await expect(dialog.getByRole('link')).toHaveCount(1);
 if(info.project.name==='chromium') await capture(page,info,'search-modal');
 await dialog.getByRole('link').click();
 await expect(page.getByRole('heading',{name:'Client proof of concept',exact:true})).toBeVisible();
 await expect(page.locator('.cover')).toBeVisible();
 await page.goto('about/');
 const job=page.locator('.job').first();
 await expect(job.locator('summary')).toContainText('SaaS Application Engineer');
 await expect(job.locator('summary')).toContainText('July 2026 – October 2026');
 await job.locator('summary').click();
 await expect(job.getByRole('link',{name:/enterprise/i})).toBeVisible();
 await expect(page.locator('.job summary').last()).toContainText('IT Intern');
 await expect(page.getByRole('heading',{name:'Certifications'})).toBeVisible();
 await expect(page.locator('a[href$=".pdf"],a[download]')).toHaveCount(0);
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.getByRole('button',{name:'Search portfolio'}).click();
 await expect(dialog).toHaveCSS('animation-name','none');
 await page.keyboard.press('Escape');
 await expect(dialog).toBeHidden();
});

test('all project links resolve and no-script gallery remains readable',async({page,browser,baseURL})=>{
 await page.goto('projects/');
 const links=await page.locator('.entry').evaluateAll(items=>items.map(e=>e.href));
 expect(links.length).toBe(12);
 for(const url of links){
   const result=await page.request.get(url);
   expect(result.status()).toBe(200);
 }
 const context=await browser.newContext({javaScriptEnabled:false,baseURL});
 try{
  const fallback=await context.newPage();
  await fallback.goto('projects/');
  await expect(fallback.locator('.entry')).toHaveCount(12);
  await expect(fallback.locator('.gallery-controls')).toBeHidden();
  await fallback.locator('.entry').last().click();
  await expect(fallback.locator('.reading h1')).toBeVisible();
 } finally {await context.close();}
});
