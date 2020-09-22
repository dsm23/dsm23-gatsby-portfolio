const formatYears = (startDate: string, endDate: string) => {
  const [startMonth, startYear] = startDate.split(' ');
  const [endMonth, endYear] = endDate.split(' ');

  if (startYear === endYear) {
    return `${startMonth} - ${endMonth} ${startYear}`;
  }

  return `${startDate} - ${endDate}`;
};

export { formatYears };
