import {test,expect} from '@playwright/test';

test('featured chapters and every listing page fit the viewport', async ({page,isMobile}) => {
  await page.setViewportSize(isMobile ? {width:375,height:667} : {width:1366,height:768});
  await page.emulateMedia({reducedMotion:'reduce'});
  for (const chapter of ['work','writing']) {
    await page.goto('./#'+chapter);
    await expect(page.locator('html')).toHaveClass(/horizontal/);
    const extra = await page.locator('#'+chapter).evaluate(el => el.scrollHeight-el.clientHeight);
    expect(extra).toBeLessThanOrEqual(1);
  }
  for (const listing of ['projects/','posts/']) {
    await page.goto(listing);
    await expect(page.locator('.gallery')).toHaveClass(/gallery-enhanced/);
    const excess = await page.locator('.gallery-page').evaluateAll(pages =>
      pages.map(el => el.scrollHeight-el.clientHeight));
    expect(Math.max(...excess)).toBeLessThanOrEqual(1);
    const clipping = await page.locator('.gallery .entry').evaluateAll(cards =>
      Math.max(...cards.map(card => card.scrollHeight-card.clientHeight)));
    expect(clipping).toBeLessThanOrEqual(1);
  }
  await page.addStyleTag({content:'html {font-size:200%}'});
  const active = page.locator('.gallery-page:not([inert])');
  expect(await active.evaluate(el => {
    el.scrollTop = el.scrollHeight;
    return el.scrollTop > 0 && el.scrollTop + el.clientHeight >= el.scrollHeight-1;
  })).toBe(true);
});

test('About links open the technology directory and career profile', async ({page,isMobile}) => {
  await page.goto('./#about');
  await page.getByRole('link',{name:'Technologies Used',exact:true}).click();
  await expect(page.getByRole('heading',{name:'Technologies Used'})).toBeVisible();
  await expect(page.getByRole('heading',{name:'AI & automation'})).toBeVisible();
  await expect(page.locator('.tool-logos li').filter({hasText:'Codex'})).toBeVisible();
  expect(await page.locator('.tool-logos img').first().evaluate(i => i.complete && i.naturalWidth > 0)).toBe(true);
  await page.getByRole('link',{name:/Read how I work with AI/}).click();
  await expect(page.getByRole('heading',{level:1})).toHaveText('How I work with AI');
  await expect(page.getByRole('article').getByRole('heading', {level:2})).toHaveText([
    'CLDH: API development and SQL',
    'Accenture and ReadyTech: defect triage and browser testing',
    'HaXus: turning a requirement into a test'
  ]);
  await page.goto('./#about');
  await page.getByRole('link',{name:'My Career Profile'}).click();
  const nav = page.locator(isMobile ? '.mobile-nav nav' : '.desktop-nav');
  await expect(nav.locator('a')).toHaveText(['Experience','Education','Certifications']);
  if (isMobile) await page.locator('.mobile-nav summary').click();
  await nav.getByRole('link',{name:'Certifications'}).click();
  await expect(page).toHaveURL(/about\/#certifications$/);
  await expect(page.locator('#certifications h2')).toBeInViewport();
  await page.goto('about/#ai-work-title');
  const job = page.locator('.job').nth(1);
  await job.locator('summary').focus();
  await page.keyboard.press('Enter');
  await expect(job.locator('.job-content')).toBeVisible();
  const links=job.locator('.related-work a');
  for(const link of await links.all()){
    expect((await link.textContent()).trim().length).toBeGreaterThan(2);
    expect((await page.request.get(await link.getAttribute('href'))).ok()).toBe(true);
  }
  await job.locator('summary').click();
  await expect(job.locator('.job-content')).toBeHidden();
  await page.getByRole('link',{name:'Back to About'}).click();
  await expect(page).toHaveURL(/portfolio\/#about$/);
  await expect(page.locator('#about h2')).toBeInViewport();
});
