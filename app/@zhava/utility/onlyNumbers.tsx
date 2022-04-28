const onlyNumbers = (value: string): number | undefined => {
  const onlyNums = value.replace(/[^0-9]/g, '');
  return parseInt(onlyNums);
}

export default onlyNumbers;
