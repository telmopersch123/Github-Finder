import { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Riple } from "react-loading-indicators";
import { Link, useParams } from "react-router-dom";
import "./repository.css";

type RepoProps = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
};

const Repository = () => {
  const { login } = useParams<{ login: string }>();
  const [repos, setRepos] = useState<RepoProps[]>([]);

  useEffect(() => {
    const getRepos = async () => {
      try {
        const resp = await fetch(`https://api.github.com/users/${login}/repos`);
        const data = await resp.json();
        setRepos(data);
      } catch (error) {
        console.error("Erro ao buscar repositórios:", error);
      }
    };
    getRepos();
  }, [login]);

  return (
    <div className="repository-container">
      <Link to="/" className="back-button">
        <FiArrowLeft className="back-icon" />
      </Link>

      <h1 className="repository-title">
        Repositórios de {login || "usuário desconhecido"}
      </h1>

      <div className="repo-list">
        {repos.length === 0 ? (
          <div className="loading-container">
            <Riple color={["#009964", "#00cc86", "#00ffa7", "#33ffb9"]} />
          </div>
        ) : (
          repos.map((repo) => (
            <div className="repo-card" key={repo.id}>
              <a
                className="repo-name"
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
              >
                {repo.name}
              </a>

              <p className="repo-description">
                {repo.description || "Sem descrição."}
              </p>

              <div className="repo-meta">
                <span>🌐 {repo.language || "Sem linguagem"}</span>
                <span>⭐ {repo.stargazers_count}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Repository;
