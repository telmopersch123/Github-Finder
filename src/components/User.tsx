import { MdLocationPin } from "react-icons/md";
import { Link } from "react-router-dom";
import type { UserProps } from "../types/user.ts";
import "./css/User.css";

const User = ({ Users }: { Users: UserProps[] }) => {
  return (
    <div
      className={`user-container ${Users.length <= 2 ? "centered-flex" : ""}`}
    >
      {Users.map((user) => (
        <div key={user.id} className="user-card">
          <img src={user.avatar_url} alt={user.login} className="user-avatar" />

          <div className="user-identity">
            <h3>Usuário</h3>
            <p>
              <a target="_blank" rel="noopener noreferrer" href={user.html_url}>
                @{user.login}
              </a>
            </p>
          </div>

          <div className="user-meta-row">
            <div className="user-meta-box">
              <h4>Tipo de organização</h4>
              <p>{user.type ?? "Não informado"}</p>
            </div>

            <div className="user-meta-box">
              <h4>
                <MdLocationPin className="user-icon" />
                Localização
              </h4>
              <p>{user.location ?? "Não informada"}</p>
            </div>
          </div>

          <div className="user-stats">
            <p>
              <strong>Seguidores:</strong> {user.followers}
            </p>
            <p>
              <strong>Seguindo:</strong> {user.following}
            </p>
          </div>

          <Link to={`/repos/${user.login}`} className="user-link">
            Ver repositórios
          </Link>
        </div>
      ))}
    </div>
  );
};

export default User;
