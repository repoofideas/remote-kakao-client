// 니가 직접 건들 수 있는 설정

// 스크립트 이름
const scriptName = 'remote-kakao';
// 서버 주소
const serverAddress = '172.30.1.1';
// 서버 포트
const serverPort = 3000;

importPackage(java.net);

const generateId = (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let _ = 0; _ < length; _++) result += characters.charAt(Math.floor(Math.random() * characters.length));

  return result;
};

const socket = new DatagramSocket();
const address = InetAddress.getByName(serverAddress);

const send = (msg) => {
  try {
    const message = new java.lang.String(msg);
    const packet = new DatagramPacket(message.getBytes(), message.getBytes().length, address, serverPort);

    socket.send(packet);
  } catch (e) {
    print(e);
  }
};

const repliers = [];

/** @param {{ room: String, msg: String, sender: String, isGroupChat: boolean, replier: { reply: (msg: String, hideToast: Boolean) => Boolean, replyDelayed: (msg: String, delay: Number, hideToast: Boolean) => Boolean, markAsRead: () => Boolean }, imageDB: { getProfileBase64: () => String, getProfileImage: () => String, getProfileBitmap: () => any } } chatData} */
const chatDataToString = (chatData) =>
  JSON.stringify({ event: 'chat', data: { room: chatData.room, msg: chatData.msg, sender: chatData.sender, isGroupChat: chatData.isGroupChat, replier: repliers.push(chatData.replier), profileImage: chatData.imageDB.getProfileBase64() } });

const response = (room, msg, sender, isGroupChat, replier, imageDB, packageName) => {
  const params = { room: room, msg: msg, sender: sender, isGroupChat: isGroupChat, replier: replier, imageDB: imageDB, packageName: packageName };

  send(chatDataToString(params));
};
