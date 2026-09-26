import { useState } from "react";

interface Props {
  onSearch: (term: string) => void;
}

function SearchBar({ onSearch }: Props) {
  const [term, setTerm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(term);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      
  <input placeholder="Search by name or email" value={term} onChange={(e) => setTerm(e.target.value)} />
  <button type="submit" className="btn" onClick={handleSubmit}>Search</button>
  <button type="button" className="btn btn-ghost" onClick={() => { setTerm(""); onSearch(""); }}>Clear</button>

    </form>
  );
}

export default SearchBar;