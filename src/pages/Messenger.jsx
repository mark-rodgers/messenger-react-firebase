import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { firestore } from "../firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { IoIosCog } from "react-icons/io";

const Messenger = () => {
  const messagesCollectionRef = collection(firestore, "messages");

  const { currentUser, logout } = useAuth();
  const [messages, setMessages] = useState([]);
  const [textInput, setTextInput] = useState("");

  const handleSendMessage = async (e) => {
    e.preventDefault();
    console.log(currentUser);
    console.log(textInput);

    addDoc(messagesCollectionRef, {
      uid: currentUser.uid,
      content: textInput,
      createdAt: serverTimestamp(),
    });

    setTextInput("");
  };

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    const getMessages = () => {
      const q = query(messagesCollectionRef, orderBy("createdAt"));

      const unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          console.log(querySnapshot);
          let m = [];
          querySnapshot.forEach((doc) => {
            m.push(doc.data());
          });
          setMessages(m);
        },
        (err) => {
          console.log(err);
        }
      );
    };

    getMessages();
  }, []);

  return (
    <div className="flex">
      {/* <div className="w-full max-w-fit h-screen bg-slate-200">
        <div className="flex flex-col h-screen border-r-1 border-slate-300">
          <div className="flex items-center bg-white px-4 py-3">
            <div className="w-10 h-10 bg-slate-300 rounded-full mr-3"></div>
            <div>
              <div className="font-bold">uid:{currentUser.uid}</div>
              <div className="text-xs text-slate-500">{currentUser.email}</div>
            </div>
            <div className="ml-3">
              <a href="#">
                <IoIosCog
                  size="32"
                  className="transition duration-200 fill-indigo-500 hover:fill-violet-600"
                />
              </a>
            </div>
          </div>
          <div className="bg-white text-center border-b-1 border-slate-300 p-4">
            <button className="w-full rounded-full transition duration-200 bg-violet-500 hover:bg-violet-600 text-white py-2 px-4">
              New Message
            </button>
          </div>
          <div className="flex-1">
            <a href="#">
              <div className="flex items-start bg-slate-100 border-b-1 border-slate-300 px-4 py-3">
                <div className="w-10 h-10 bg-slate-300 rounded-full mr-3"></div>
                <div>
                  <div className="font-bold">{"{{ user.display_name }}"}</div>
                  <div className="text-xs text-slate-500 py-2">
                    {"{{ last_message }} - {{ last_message_timestamp }}"}
                  </div>
                </div>
              </div>
            </a>
            <a href="#">
              <div className="flex items-start bg-slate-100 border-b-1 border-slate-300 px-4 py-3">
                <div className="w-10 h-10 bg-slate-300 rounded-full mr-3"></div>
                <div>
                  <div className="font-bold">{"{{ user.display_name }}"}</div>
                  <div className="text-xs text-slate-500 py-2">
                    {"{{ last_message }} - {{ last_message_timestamp }}"}
                  </div>
                </div>
              </div>
            </a>
          </div>
          <div className="text-center m-4">
            <button
              onClick={handleLogout}
              className="w-full rounded-full transition duration-200 bg-violet-500 hover:bg-violet-600 text-white py-2 px-4"
            >
              Log out
            </button>
          </div>
        </div>
      </div> */}
      <div className="flex-1 flex flex-col h-screen p-4">
        <div>
          <h1 className="text-2xl font-bold">Messages</h1>
        </div>
        <div className="flex-1 flex flex-col my-6 overflow-auto">
          {messages.map((message, index) => (
            <div key={index} className="flex">
              <div className="mr-4">
                <div className="w-12 h-12 bg-slate-300 rounded-full"></div>
              </div>
              <div className="flex-1">
                <div className="font-bold break-all">uid:{message.uid}</div>
                <div>{message.content}</div>
                {message.createdAt ? (
                  <div className="text-xs text-slate-500 py-2">
                    {message.createdAt.toDate().toLocaleString()}
                  </div>
                ) : (
                  <div className="text-xs text-slate-500 py-2">Sending ...</div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div>
          <form className="flex" onSubmit={handleSendMessage}>
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              className="flex-1 p-2 transition duration-200 border-1 border-slate-300 focus:outline-none focus:ring mr-4"
            />
            <button
              type="submit"
              className="rounded-full transition duration-200 bg-violet-500 hover:bg-violet-600 text-white py-2 px-4"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Messenger;
