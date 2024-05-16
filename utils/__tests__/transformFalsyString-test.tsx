import transformFalsyString from '@/utils/transformFalsyString';

describe('transformFalsyString', () => {
  it('should return the same string if it is not undefined, null, or "unknown"', () => {
    expect(transformFalsyString('hello')).toBe('hello');
    expect(transformFalsyString('world')).toBe('world');
  });

  it('should return "N/A" if the input is undefined', () => {
    expect(transformFalsyString(undefined)).toBe('N/A');
  });

  it('should return "N/A" if the input is null', () => {
    expect(transformFalsyString(null)).toBe('N/A');
  });

  it('should return "N/A" if the input is "unknown"', () => {
    expect(transformFalsyString('unknown')).toBe('N/A');
  });

  it('should return "N/A" if the input is an empty string', () => {
    expect(transformFalsyString('')).toBe('N/A');
  });
});
