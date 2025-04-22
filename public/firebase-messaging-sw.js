importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js");

const options = {
  apiKey: process.env.NEXT_PUBLIC_F_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_F_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_F_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_F_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_F_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_F_APPID,
  measurementId: process.env.NEXT_PUBLIC_F_MEASUREMENTID,
};
firebase.initializeApp(options);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload,
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "./logo.png",
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
