import test from 'node:test';
import assert from 'node:assert/strict';
import { advance, chapterIndex, resolveTheme, splashEligible } from '../../src/utils/portfolio.mjs';

test('new sessions pass only when storage is both readable and writable', () => {
  const data = new Map();
  const storage = {getItem:k=>data.get(k), setItem:(k,v)=>data.set(k,v), removeItem:k=>data.delete(k)};
  const visit = {hash:'',reduced:false,historyReturn:false,storage};
  assert.equal(splashEligible(visit),true);
  assert.equal(data.size,0);
  for (const bypass of [{hash:'#work'},{reduced:true},{historyReturn:true},{storage:undefined},
    {storage:{...storage,setItem(){throw Error('quota');}}}]) {
    assert.equal(splashEligible({...visit,...bypass}),false);
  }
  data.set('sej:intro','1');
  assert.equal(splashEligible(visit),false);
});

test('chapter anchors retain old inbound links and stop at the ends',()=>{
  for(const [oldId,newId] of [['projects','work'],['blog','writing'],['home','intro']]) {
    assert.equal(chapterIndex('#'+oldId),chapterIndex('#'+newId));
  }
  assert.equal(chapterIndex('#unknown'),-1);
  assert.equal(advance(0,-40),0);
  assert.equal(advance(1,40),2);
  assert.equal(advance(4,40),4);
});

test('saved themes take precedence and invalid values follow the system',()=>{
  assert.equal(resolveTheme('light',true),'light');
  assert.equal(resolveTheme('dark',false),'dark');
  assert.equal(resolveTheme('invalid',true),'dark');
  assert.equal(resolveTheme(null,false),'light');
});
