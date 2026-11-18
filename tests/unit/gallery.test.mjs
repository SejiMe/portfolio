import test from 'node:test';
import assert from 'node:assert/strict';
import {pageSize,pageCount,clampPage,regroupPage,compareEntries,formatEntryDate} from '../../src/utils/gallery.mjs';
import {experience,certifications,awards} from '../../src/data/career.mjs';

test('gallery pagination clamps empty and partial pages at responsive boundaries',()=>{
 assert.deepEqual([649,650,1099,1100].map(pageSize),[1,2,2,4]);
 assert.equal(pageCount(12,4),3);
 assert.equal(pageCount(13,4),4);
 assert.equal(pageCount(0,4),1);
 assert.equal(clampPage(-1,12,4),0);
 assert.equal(clampPage(9,12,4),2);
});
test('regrouping keeps the previously viewed entry in the new page',()=>{
 assert.equal(regroupPage(2,4,1,12),8);
 assert.equal(regroupPage(7,1,4,12),1);
 assert.equal(regroupPage(9,1,4,7),1);
});
test('dates remain optional and undated entries sort deterministically',()=>{
 const entries=[{slug:'z',data:{title:'Z'}},{slug:'b',data:{year:2024}},{slug:'a',data:{year:2026}},{slug:'a',data:{title:'A'}}];
 assert.deepEqual(entries.sort(compareEntries).map(e=>e.slug),['a','b','a','z']);
 assert.equal(formatEntryDate({}), '');
 assert.equal(formatEntryDate({year:2024}),'2024');
 assert.equal(compareEntries({title:'A'},{title:'A'}),0);
 assert.ok(compareEntries({date:new Date('2026-02-01')},{date:new Date('2026-01-01')})<0);
});
test('experience records match resume chronology and include certificates and awards',()=>{
 assert.deepEqual(experience.map(e=>[e.title,e.date]),[
 ['SaaS Application Engineer','July 2026 – October 2026'],
 ['Software Developer','September 2023 – July 2026'],
 ['IT Intern','March 2023 – July 2023']]);
 assert.equal(certifications.length,4);
 assert.ok(awards.includes('Best in Research Capstone'));
});
