import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import "./css/Search.css";

type UserProps = {
  loadUser: (username: string) => Promise<void>;
};

const Search = ({ loadUser }: UserProps) => {
  const [username, setUsername] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      loadUser(username);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      loadUser(username);
    }
  };

  return (
    <div className="search-container">
      <h2>Busque por um usuário:</h2>
      <p>Conheça os melhores repositórios</p>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="Digite o nome do usuário"
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button type="submit">
          <BsSearch />
        </button>
      </form>
    </div>
  );
};

export default Search;
