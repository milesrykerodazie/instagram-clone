import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { db, storage } from "./firebase";
import firebase from "firebase";
import "../ComponentsCss/ImageUpload.css";

function ImageUpload({ username }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (image !== null) {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // progress function here
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 1000
          );
          setProgress(progress);
        },
        (error) => {
          //error function to handle if ther is any error
          alert(error.message);
        },
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              // post the url inside the database
              db.collection("posts").add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                caption: caption,
                image: url,
                username: username,
              });
              setProgress(0);
              setCaption("");
              setImage(null);
            });
        }
      );
    }
  };

  return (
    <div className="imageupload">
      <form className="imageupload__form">
        <progress
          className="imageupload__progress"
          value={progress}
          max="100"
        />
        <div className="imageupload__inputs">
          <input
            className="imageupload__caption"
            type="text"
            placeholder="Enter a caption for the upload.."
            onChange={(event) => setCaption(event.target.value)}
            value={caption}
          />
          <div className="s2">
            <input
              className="imageupload__file"
              type="file"
              onChange={handleChange}
            />
            <Button
              disabled={!caption}
              className="imageupload__button"
              onClick={handleUpload}
            >
              Upload
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ImageUpload;
