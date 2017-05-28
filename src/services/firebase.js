import { FB_KEY } from "../../config";

const API_URL = "https://fcm.googleapis.com/fcm/send";

class FirebaseClient {
  push(data, type) {
    const body = JSON.stringify(data);
    const headers = new Headers({
      "Content-Type": "application/json",
      "Content-Length": parseInt(body.length),
      "Authorization": "key=" + FB_KEY
    });

    fetch(API_URL, { method: "POST", headers, body })
      .then(response => console.log("Send " + type + " response", response))
      .catch(error => console.log("Error sending " + type, error));
  }

}

const firebase = new FirebaseClient();
export default firebase;
