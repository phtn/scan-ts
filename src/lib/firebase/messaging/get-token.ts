import { getMessaging, getToken } from "firebase/messaging";
import { onInfo, onSuccess } from "@/app/_ctx/toast";
import { app } from "..";
import { setToken } from "@/app/actions";
// import { setToken } from "@/app/actions";

export function requestPermission() {
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log(process.env.NEXT_PUBLIC_F_VAPID_KEY);
      console.log("Notification permission granted.");
      // Get registration token. Initially this makes a network call, once retrieved
      // subsequent calls to getToken will return from cache.
      const messaging = getMessaging(app);

      console.log("Getting fcm-token.");
      getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_F_VAPID_KEY,
      }).then((currentToken) => {
        if (currentToken) {
          console.log("Storing fcm-token.");
          setToken(currentToken).catch(console.log);
          console.log(currentToken);

          // Send the token to your server and update the UI if necessary
          onSuccess("Push Notification Enabled");
        } else {
          // Show permission request UI
          console.log(
            "No registration token available. Request permission to generate one.",
          );
          // ...
        }
      });
    } else {
      console.log("Permission denied");
      onInfo("Push Notification Disabled");
      // onWarn("You will not receive any new user data.");
    }
  });
}
