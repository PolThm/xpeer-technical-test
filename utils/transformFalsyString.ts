const transformFalsyString = (value: string | undefined | null): string => {
  return !!value && value !== 'unknown' ? value : 'N/A';
};

export default transformFalsyString;
