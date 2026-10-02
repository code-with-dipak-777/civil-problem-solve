export const generateComplaintId = () => {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const timestamp = Date.now().toString().slice(-4);
  return `CMP-${timestamp}${randomNum}`;
};
