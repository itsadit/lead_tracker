import type { Lead } from "../App";
import LeadRow from "./LeadRow";

interface Props {
  leads: Lead[];
  onStatusChange: (id: string, status: string) => void;
}

function LeadList({ leads, onStatusChange }: Props) {
  if (leads.length === 0) return <div className="empty-state">No leads yet — add your first one above.</div>;

  return (
    <table border={1} cellPadding={8} style={{ width: "100%" }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Status</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody>
        {leads.map((lead) => (
          <LeadRow key={lead._id} lead={lead} onStatusChange={onStatusChange} />
        ))}
      </tbody>
    </table>
  );
}

export default LeadList;