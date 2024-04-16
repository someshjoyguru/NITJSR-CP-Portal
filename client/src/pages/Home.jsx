import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context, server } from "../main";
import { toast } from "react-hot-toast";
import { Navigate } from "react-router-dom";

import "../App.css";
import "../styles/Home.css";


const Home = () => {
  const [refresh, setRefresh] = useState(false);
  const [quotes, setQuotes]=useState([]);
  
  const { isAuthenticated } = useContext(Context);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedPhone, setEditedPhone] = useState("");
  const [editedRegistrationNo, setEditedRegistrationNo] = useState("");
  const [editedShirtSize, setEditedShirtSize] = useState("");
  const [editedCodeforces, setEditedCodeforces] = useState("");
  const [editedRating, setEditedRating] = useState("0");
  
  if (!isAuthenticated) return <Navigate to={"/login"} />;
  useEffect(() => {
    axios.get(`${server}/users/me`, {
      withCredentials: true,
    })
    .then((res) => {
      setEditedName(res.data.user.name);
      setEditedEmail(res.data.user.email);
      setEditedPhone(res.data.user.phone);
      setEditedRegistrationNo(res.data.user.registrationNo);
        setEditedShirtSize(res.data.user.shirtSize);
        setEditedCodeforces(res.data.user.codeforces);
      })
      .catch((e) => {
        console.error(e);
        toast.error(e.response.data.message);
      });

      axios.get("https://type.fit/api/quotes")
      .then(function(response) {
        const data = response.data;
        const index = Math.floor(Math.random() * data.length);
        let author = data[index].author;
        author = author.includes(', ') ? author.split(', ')[0] : author;
        setQuotes([data[index].text, author]);
      })
      .catch(error => console.error("Error fetching quotes:", error));
  }, [refresh]);


  const Quote = ({ text, author }) => {
    return (
      <div className="quote">
        <blockquote>
          <p>{text}</p>
          <footer>- {author}</footer>
        </blockquote>
      </div>
    );
  };



  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDone = async () => {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `https://codeforces.com/api/user.rating?handle=${editedCodeforces}`,
      headers: { }
    };

    await axios.request(config)
    .then((response) => {
      console.log(response.data.result);
      setEditedRating(JSON.stringify(response.data.result[response.data.result.length-1].newRating));
      console.log(editedRating);
    })
    .catch((error) => {
      console.log(error);
      toast.error(error.response.data.comment);
    });

    const data = {
      phone: editedPhone,
      registrationNo: editedRegistrationNo,
      shirtSize: editedShirtSize,
      codeforces: editedCodeforces,
      codeforcesRating: editedRating,
    };

    config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${server}/users/editme`,
      headers: {
        contentType: 'application/json',
      },
      data : data,
      withCredentials: true,
    };

    await axios.request(config)
    .then((response) => {
      console.log(response.data);
      setIsEditing(false);
      toast.success("Profile updated successfully");
    })
    .catch((error) => {
      console.error(error);
      toast.error(error.response.data.message);
    });
  };

  return (
    <>
      <div className="container">
        <div className="subcontainer profile">
          <h1 className="heading"> Hello, {editedName}</h1>
          <h6 className="subheading"> Let's Crack It</h6>
          <Quote text={quotes[0]} author={quotes[1]} />
          <div className="profile">
            {isEditing ? (
              <>
                <div className="">
                  Name:{" "}
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                  />
                </div>
                <div className="">
                  Email:{" "}
                  <input
                    type="text"
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)}
                  />
                </div>
                <div className="">
                  Phone:{" "}
                  <input
                    type="text"
                    value={editedPhone}
                    onChange={(e) => setEditedPhone(e.target.value)}
                  />
                </div>
                <div className="">
                  Registration No.:{" "}
                  <input
                    type="text"
                    value={editedRegistrationNo}
                    onChange={(e) => setEditedRegistrationNo(e.target.value)}
                  />
                </div>
                <div className="">
                  Shirt Size:{" "}
                  <input
                    type="text"
                    value={editedShirtSize}
                    onChange={(e) => setEditedShirtSize(e.target.value)}
                  />
                </div>
                <div className="">
                  Codeforces Id:{" "}
                  <input
                    type="text"
                    value={editedCodeforces}
                    onChange={(e) => setEditedCodeforces(e.target.value)}
                  />
                </div>
                <button onClick={handleDone}>Done</button>
              </>
            ) : (
              <>
                <div className="">Name: {editedName}</div>
                <div className="">Email: {editedEmail}</div>
                <div className="">Phone: {editedPhone}</div>
                <div className="">Registration No.: {editedRegistrationNo}</div>
                <div className="">Shirt Size: {editedShirtSize}</div>
                <div className="">Codeforces Id: {editedCodeforces}</div>
                <div className="">Codeforces Rating: {editedRating}</div>
                <button onClick={handleEdit}>Edit</button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
