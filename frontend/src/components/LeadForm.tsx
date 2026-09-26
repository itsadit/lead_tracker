import { useState } from "react";

interface Props {
  onCreate: (data: { name: string; email: string; phone: string }) => Promise<void>;
}

function LeadForm({ onCreate }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !phone) {
      setError("All fields are required.");
      return;
    }

    try {
      await onCreate({ name, email, phone });
      setName("");
      setEmail("");
      setPhone("");
    } catch (err: any) {
      const message = err?.response?.data?.message || "Failed to create lead.";
      setError(message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="lead-form">
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <button type="submit" className="btn">Add Lead</button>
      {error && <p className="form-error">{error}</p>}
    </form>
  );
}

export default LeadForm;