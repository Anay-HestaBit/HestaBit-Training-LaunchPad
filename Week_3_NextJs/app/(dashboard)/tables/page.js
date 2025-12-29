import ListCard from '@/components/Tables/ListCard';
import { userData } from '@/components/data/Tables/authorData';
import { data } from '@/components/data/Tables/projectsData';

const columns = ['Companies', 'Budget', 'Status', 'Completion', 'Actions'];

const userColumns = ['Author', 'Function', 'Status', 'Employed', 'Actions'];

export default function TablesPage() {
  return (
    <div className="space-y-8">
      <ListCard title="Authors Table" columns={userColumns} data={userData} />

      <ListCard
        title="Projects"
        subtitle="✅ 30 done this month"
        columns={columns}
        data={data}
      />
    </div>
  );
}
