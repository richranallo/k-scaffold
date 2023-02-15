import { describe, it, expect, vi } from 'vitest';
import resolvePaths from './../../lib/render/resolvePaths';

describe('resolvePaths()',()=>{
  it('Should resolve the relative source and destination paths',()=>{
    const retArr = resolvePaths('./','./',{name:'test.pug'});
    expect(retArr[0]).toMatch(/test\.pug$/);
    expect(retArr[1]).toMatch(/test\.html$/);
  })
});