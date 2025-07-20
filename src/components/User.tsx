import { MdLocationPin } from "react-icons/md";
import { Link } from "react-router-dom";
import type { UserProps } from "../types/user.ts";
import "./css/User.css";

const User = ({
  login,
  avatar_url,
  followers,
  following,
  location,
}: UserProps) => {
  return (
    <div className="user-card">
      <img src={avatar_url} alt={login} className="user-avatar" />
      <h2 className="user-name">@{login}</h2>

      <div className="user-info">
        <MdLocationPin className="user-icon" />
        <p>{location ?? "Local não informado"}</p>
      </div>

      <div className="user-stats">
        <p>
          <strong>Seguidores:</strong> {followers}
        </p>
        <p>
          <strong>Seguindo:</strong> {following}
        </p>
      </div>

      <Link to={`/repos/${login}`} className="user-link">
        Ver repositórios
      </Link>
    </div>
  );
};

export default User;
