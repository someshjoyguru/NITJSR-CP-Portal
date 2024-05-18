import { useState, useEffect } from 'react';
import findUserById from './findUserById';

const useUserProfile = (userId) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await findUserById(userId);
      if (userData) {
        setUser(userData.data);
      }
    };

    fetchUser();
  }, [userId]);

  return user;
};

export default useUserProfile;
