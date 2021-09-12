importPackage(java.net);

const generateId = (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let _ = 0; _ < length; _++) result += characters.charAt(Math.floor(Math.random() * characters.length));

  return result;
};

try {
  const socket = new DatagramSocket();
  const address = InetAddress.getByName('127.0.0.1');
  const message = new java.lang.String(generateId(10));

  const packet = new DatagramPacket(message.getBytes(), message.getBytes().length, address, 3000);

  socket.send(packet);
  socket.close();
} catch (e) {
  print(e);
}
