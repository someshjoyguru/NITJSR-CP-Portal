import React from 'react'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { server } from '../main';
import axios from 'axios';

const Leaderboard = () => {
  const [leader, setLeader] = useState([]);
  useEffect(() => {
    axios.get(`${server}/leaderboard`, {
      withCredentials: true,
    })
      .then((res) => {
        setLeader(res.data.leaderboard);
        toast.success("Leaderboard fetched successfully!");
      })
      .catch((e) => {
        console.error(e);
        toast.error(e.response.data.message);
      });
  }, []);
  return (
    <>
      <Link to="/">Home</Link>
      <div>Leaderboard</div>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Codeforces Rating</th>
          </tr>
        </thead>
        <tbody>
          {leader.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.codeforcesRating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )

}

export default Leaderboard