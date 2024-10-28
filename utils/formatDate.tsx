export const formatDate = (dateString: string) => {
  const d = new Date(dateString);
  const months = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
  const day = d.getDate();

  return `${day} ${months[d.getMonth()]} ${d.getFullYear().toString().slice(2)}, ${d.getHours() > 9 ? d.getHours() : '0' + d.getHours()}:${d.getMinutes() > 9 ? d.getMinutes() : '0' + d.getMinutes()}`;
};