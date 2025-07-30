import { MySpaceInfoRow } from './my-space-info-row';
import {
  Clapperboard,
  Library,
  Tv,
  RefreshCw,
  User,
  Calendar,
  Globe,
  Link2,
  Smartphone,
  Shield,
  Power,
} from 'lucide-react';
import { MySpaceInfoRowWrapper } from './my-space-info-row-wrapper';

export function MySpace() {
  return (
    <div className="flex flex-col gap-4 mt-4 text-sm">
      <h2 className="text-xl font-bold text-center">My Space</h2>

      <MySpaceInfoRowWrapper>
        <MySpaceInfoRow icon={Clapperboard} label="Movies" value="80227" />
        <MySpaceInfoRow icon={Library} label="Series" value="17419" />
        <MySpaceInfoRow icon={Tv} label="Live" value="24933" />
        <MySpaceInfoRow icon={RefreshCw} label="Update All" value="" showChevron />
      </MySpaceInfoRowWrapper>

      <MySpaceInfoRowWrapper>
        <MySpaceInfoRow icon={User} label="Username" value="8cea4b03585c" />
        <MySpaceInfoRow icon={Calendar} label="Days Left" value="159" />
        <MySpaceInfoRow icon={Globe} label="Timezone" value="Europe/Amsterdam" />
        <MySpaceInfoRow icon={Calendar} label="Start Date" value="Nov 13, 2024" />
        <MySpaceInfoRow icon={Calendar} label="End Date" value="Dec 13, 2025" />
        <MySpaceInfoRow icon={Link2} label="Max Connections" value="1" />
        <MySpaceInfoRow icon={Smartphone} label="App Version" value="1.1.11" />
        <MySpaceInfoRow icon={Shield} label="Privacy Policy" value="" showChevron />
        <MySpaceInfoRow icon={Power} label="Status" value="Active" valueColor="text-green-500" />
      </MySpaceInfoRowWrapper>

       <div className="px-3 rounded-lg bg-card">
          <div className="flex items-center justify-between py-3 text-sm">
              <span className="font-medium text-primary">Reset Data</span>
          </div>
       </div>
    </div>
  );
}
