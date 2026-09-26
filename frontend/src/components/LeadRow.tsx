import type { Lead } from "../App";

interface Props {
  lead: Lead;
  onStatusChange: (id: string, status: string) => void;
}

const STATUSES = ["new", "contacted", "qualified", "converted", "lost"];

function LeadRow({ lead, onStatusChange }: Props) {
  return (
    <tr>
      <td>{lead.name}</td>
      <td>{lead.email}</td>
      <td>{lead.phone}</td>
      <td>
        <select
  value={lead.status}
  data-status={lead.status}
  onChange={(e) => onStatusChange(lead._id, e.target.value)}
>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </td>
      <td>{new Date(lead.createdAt).toLocaleString()}</td>
    </tr>
  );
}

export default LeadRow;