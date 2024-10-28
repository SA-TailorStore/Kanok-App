export const formatTrackingNumber = (string: string) => {
  const trackingNumber = string.split('|');
  return `${trackingNumber[0]} : ${trackingNumber[1]}`;
};