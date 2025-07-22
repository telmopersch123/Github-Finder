import { useState } from "react";
import Error from "../components/Error.tsx";
import Search from "../components/Search.tsx";
import User from "../components/User.tsx";
import type { UserProps } from "../types/user.ts";

type UserSearchItem = {
  login: string;
  url: string;
  avatar_url: string;
};

const Home = () => {
  const [user, setUser] = useState<UserProps[] | null>([]);
  const [error, setError] = useState(false);

  const loadUser = async (username: string) => {
    setError(false);
    setUser(null);
    const res = await fetch(
      `https://api.github.com/search/users?q=${username}`
    );

    const data = await res.json();
    if (res.status === 404) {
      setError(true);
      return;
    }

    const userDettails = await Promise.all(
      data.items.map(async (user: UserSearchItem) => {
        const detailsRes = await fetch(user.url, {
          headers: {
            Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
          },
        });
        const details = await detailsRes.json();

        return {
          id: details.id,
          avatar_url: details.avatar_url,
          login: details.login,
          html_url: details.html_url,
          followers: details.followers,
          following: details.following,
          type: details.type,
          location: details.location,
        } as UserProps;
      })
    );

    setUser(userDettails);
  };

  return (
    <div className="container">
      <Search loadUser={loadUser} />
      {user && <User Users={user} />}
      {error && <Error />}
    </div>
  );
};

export default Home;
