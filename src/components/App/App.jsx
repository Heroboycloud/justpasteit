import React, { useState } from "react";
import Header from "../Header/Header";

import Typing from "../Typing/Typing";
import axios from "axios";
import { Routes, Route, useNavigate } from "react-router-dom";
import SharePage from "../SharePage/SharePage";
import style from "./App.module.css";
import ToggleDarkMode from "../ToggleDarkMode/ToggleDarkMode";
import { ToastContainer, toast } from 'react-toastify';

// Dark mode custom
import useDarkMode from 'use-dark-mode';

const API_BASE = import.meta.env.VITE_API_URL || "https://justpasteitapi.herokuapp.com";

const App = () => {
  const navigate = useNavigate();
  const [shareText, setShareText] = useState("");
  const [created, setCreated] = useState(false);

  const darkMode = useDarkMode(false);

  const handleInputChange = (inputValue) => {
    setShareText(inputValue);
  };

  const onSubmit = (inputValue) => {
    setCreated(true);
    if (shareText === "<p><br></p>" || !shareText) {
      toast.error("Error : Empty Text");
    } else {
      axios
        .post(`${API_BASE}/add`, { content: shareText })
        .then((response) => {
          let id = response.data["_id"];
          navigate("/" + id);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <div>
      <Header headTitle="Just Pasteit"/>
      <ToggleDarkMode darkMode={darkMode}/>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Typing handleInputChange={handleInputChange} onSubmit={onSubmit} />
              <ToastContainer
                toastStyle={{
                  paddingLeft: '5rem'
                }}
                position="bottom-center"
                autoClose={1000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </>
          }
        />
        <Route path="/:id" element={<SharePage />} />
      </Routes>
      <div className={style.container}>
      </div>
    </div>
  );
};

export default App;
