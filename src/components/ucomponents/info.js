import './info.scss';
import { useEffect, useState } from "react";
import {
    getDoc,
    doc,
    serverTimestamp,
    setDoc,
  } from "firebase/firestore";

import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { auth, db, storage } from '../../firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from '../pages/AuthContext';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

// ... (other imports)

const Info = ({ inputs, title }) => {
  const { authUser, isLoading } = useAuth();
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [per, setPerc] = useState(null);
  const [imageURL, setImageURL] = useState(
    "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
  );
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserData = async () => {
      try {
        const userDoc = await getDoc(doc(db, "users", authUser.uid));

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setData(userData);
          console.log(userData)
        }
      } catch (error) {
        console.error("Error checking user data:", error);
      }
    };

    checkUserData();
  }, [authUser.uid]);

  useEffect(() => {
    const uploadFile = async () => {
      const name = new Date().getTime() + file.name;

      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setPerc(progress);
        },
        (error) => {
          console.log(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setData((prev) => ({ ...prev, img: downloadURL }));
            setImageURL(downloadURL);
          } catch (error) {
            console.error("Error getting download URL:", error);
          }
        }
      );
    };

    if (file) {
      uploadFile();
    }
  }, [file]);

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, "users", authUser.uid), {
        ...data,
        timeStamp: serverTimestamp(),
      });
      console.log(data)
      navigate("/user");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="new">
      <div className="newContainer">
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
          {data.img ? (
              <img src={data.img} alt="" />
            ) : (
              <img src={imageURL} alt="" />
            )}
          </div>
          <div className="right">
            <form onSubmit={handleAdd}>
              <div className="formInput">
                <label htmlFor="file">
                  Change avatar: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs &&
                inputs.map((input) => (
                  <div className="formInput" key={input.id}>
                    <label>{input.label}</label>
                      <input
                        id={input.id}
                        type={input.type}
                        placeholder={input.placeholder}
                        onChange={handleInput}
                        value={data[input.id] || ""}
                      />
                  </div>
                ))}
              <button disabled={per !== null && per < 100} type="submit">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;





