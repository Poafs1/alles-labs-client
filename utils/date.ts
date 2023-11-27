import dayjs from 'dayjs';
// import buddhistEra from 'dayjs/plugin/buddhistEra';

// dayjs.extend(buddhistEra);

const mapDateToDDMMMMYYYY = (date: Date | undefined) => {
  if (!date) return '';

  return dayjs(date).format('DD MMMM YYYY');
};

export { mapDateToDDMMMMYYYY };
