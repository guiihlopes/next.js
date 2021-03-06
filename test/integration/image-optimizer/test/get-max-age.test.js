/* eslint-env jest */
import { getMaxAge } from '../../../../packages/next/dist/server/image-optimizer.js'

describe('getMaxAge', () => {
  it('should return default when no cache-control provided', () => {
    expect(getMaxAge(undefined, 60)).toBe(60)
  })
  it('should return default when cache-control is null', () => {
    expect(getMaxAge(null, 60)).toBe(60)
  })
  it('should return default when cache-control is empty string', () => {
    expect(getMaxAge('', 60)).toBe(60)
  })
  it('should return default when cache-control max-age is less than default', () => {
    expect(getMaxAge('max-age=30', 60)).toBe(60)
  })
  it('should return default when cache-control max-age is not a number', () => {
    expect(getMaxAge('max-age=foo', 60)).toBe(60)
  })
  it('should return default when cache-control is no-cache', () => {
    expect(getMaxAge('no-cache', 60)).toBe(60)
  })
  it('should return cache-control max-age lowercase', () => {
    expect(getMaxAge('max-age=9999', 60)).toBe(9999)
  })
  it('should return cache-control MAX-AGE uppercase', () => {
    expect(getMaxAge('MAX-AGE=9999', 60)).toBe(9999)
  })
  it('should return cache-control s-maxage lowercase', () => {
    expect(getMaxAge('s-maxage=9999', 60)).toBe(9999)
  })
  it('should return cache-control S-MAXAGE', () => {
    expect(getMaxAge('S-MAXAGE=9999', 60)).toBe(9999)
  })
  it('should return cache-control s-maxage with spaces', () => {
    expect(getMaxAge('public, max-age=5555, s-maxage=9999', 60)).toBe(9999)
  })
  it('should return cache-control s-maxage without spaces', () => {
    expect(getMaxAge('public,s-maxage=9999,max-age=5555', 60)).toBe(9999)
  })
  it('should return cache-control for a quoted value', () => {
    expect(getMaxAge('public, s-maxage="9999", max-age="5555"', 60)).toBe(9999)
  })
})
