importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyAwGz0UMJkuJt1lHwRBfmjuOmzmQrHjWds",
  authDomain: "autoprotect-scan.firebaseapp.com",
  projectId: "autoprotect-scan",
  storageBucket: "autoprotect-scan.firebasestorage.app",
  messagingSenderId: "1095526681742",
  appId: "1:1095526681742:web:1c65f98efb001aaf48cddf",
  measurementId: "G-ET80CFYPTK",
};
firebase.initializeApp(firebaseConfig);
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
