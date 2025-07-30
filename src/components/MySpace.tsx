import {
  Clapperboard,
  Library,
  Tv,
  RefreshCw,
  ChevronRight,
  User,
  Calendar,
  Globe,
  Link2,
  Smartphone,
  Shield,
  Power,
} from 'lucide-react';

const InfoRow = ({ icon: Icon, label, value, valueColor, showChevron }: { icon: React.ElementType, label: string, value: string, valueColor?: string, showChevron?: boolean }) => (
  <div className="flex items-center justify-between py-3 border-b border-border/50 last:border-b-0">
    <div className="flex items-center gap-4">
      <div className="p-2 bg-secondary rounded-full">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <span className="font-medium">{label}</span>
    </div>
    <div className="flex items-center gap-2">
      <span className={`font-semibold ${valueColor}`}>{value}</span>
      {showChevron && <ChevronRight className="w-5 h-5 text-muted-foreground" />}
    </div>
  </div>
);


export function MySpace() {
  return (
    <div className="flex flex-col gap-6 mt-6">
      <h2 className="text-xl font-bold text-center">My Space</h2>

      <div className="p-4 space-y-2 rounded-lg bg-card">
        <InfoRow icon={Clapperboard} label="Movies" value="80227" />
        <InfoRow icon={Library} label="Series" value="17419" />
        <InfoRow icon={Tv} label="Live" value="24933" />
        <InfoRow icon={RefreshCw} label="Update All" value="" showChevron />
      </div>

      <div className="p-4 space-y-2 rounded-lg bg-card">
        <InfoRow icon={User} label="Username" value="8cea4b03585c" />
        <InfoRow icon={Calendar} label="Days Left" value="159" />
        <InfoRow icon={Globe} label="Timezone" value="Europe/Amsterdam" />
        <InfoRow icon={Calendar} label="Start Date" value="Nov 13, 2024" />
        <InfoRow icon={Calendar} label="End Date" value="Dec 13, 2025" />
        <InfoRow icon={Link2} label="Max Connections" value="1" />
        <InfoRow icon={Smartphone} label="App Version" value="1.1.11" />
        <InfoRow icon={Shield} label="Privacy Policy" value="" showChevron />
        <InfoRow icon={Power} label="Status" value="Active" valueColor="text-green-500" />
      </div>

       <div className="p-4 space-y-2 rounded-lg bg-card">
          <div className="flex items-center justify-between py-3">
              <span className="font-medium text-primary">Reset Data</span>
          </div>
       </div>
    </div>
  );
}
