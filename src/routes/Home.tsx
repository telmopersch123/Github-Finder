import { useState } from "react";
import Error from "../components/Error.tsx";
import Search from "../components/Search.tsx";
import User from "../components/User.tsx";
import type { UserProps } from "../types/user.ts";
const Home = () => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [error, setError] = useState(false);

  const loadUser = async (username: string) => {
    setError(false);
    setUser(null);
    const res = await fetch(`https://api.github.com/users/${username}`);

    const data = await res.json();

    if (res.status === 404) {
      setError(true);
      return;
    }

    const { avatar_url, login, location, followers, following } = data;
    const userData: UserProps = {
      avatar_url,
      login,
      location,
      followers,
      following,
    };
    setUser(userData);
  };

  return (
    <div>
      <Search loadUser={loadUser} />
      {user && <User {...user} />}
      {error && <Error />}
    </div>
  );
};

export default Home;
