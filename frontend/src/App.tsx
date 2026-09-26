import { useState, useEffect } from "react";
import { getLeads, createLead, updateLeadStatus } from "./api";
import LeadForm from "./components/LeadForm";
import SearchBar from "./components/SearchBar";
import LeadList from "./components/LeadList";
import "./App.css";

export interface Lead {
  _id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  createdAt: string;
}

function App() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async (search?: string) => {
    try {
      setLoading(true);
      const res = await getLeads(search);
      setLeads(res.data);
    } catch (err) {
      console.error("Failed to fetch leads:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleCreate = async (data: {
    name: string;
    email: string;
    phone: string;
  }) => {
    await createLead(data); 
  fetchLeads();

  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateLeadStatus(id, status);
      fetchLeads();
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleSearch = (term: string) => {
    fetchLeads(term);
  };

    return (
    <div className="app">
      <h1>Lead Tracker</h1>
      <p className="subtitle">Track and manage your sales pipeline</p>
      <div className="panel">
        <LeadForm onCreate={handleCreate} />
      </div>
      <div className="search-bar">
        <SearchBar onSearch={handleSearch} />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <LeadList leads={leads} onStatusChange={handleStatusChange} />
      )}
    </div>
  );
}

export default App;