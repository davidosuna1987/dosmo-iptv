import { ProfileInfoRow } from './profile-info-row';
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
import { ProfileInfoRowWrapper } from './profile-info-row-wrapper';

export function Profile() {
  return (
    <div className="max-w-[500px] mx-auto flex flex-col gap-4 text-sm pt-10">
      <ProfileInfoRowWrapper>
        <ProfileInfoRow icon={Clapperboard} label="Movies" value="80227" />
        <ProfileInfoRow icon={Library} label="Series" value="17419" />
        <ProfileInfoRow icon={Tv} label="Live" value="24933" />
        <ProfileInfoRow icon={RefreshCw} label="Update All" value="" showChevron />
      </ProfileInfoRowWrapper>

      <ProfileInfoRowWrapper>
        <ProfileInfoRow icon={User} label="Username" value="8cea4b03585c" />
        <ProfileInfoRow icon={Calendar} label="Days Left" value="159" />
        <ProfileInfoRow icon={Globe} label="Timezone" value="Europe/Amsterdam" />
        <ProfileInfoRow icon={Calendar} label="Start Date" value="Nov 13, 2024" />
        <ProfileInfoRow icon={Calendar} label="End Date" value="Dec 13, 2025" />
        <ProfileInfoRow icon={Link2} label="Max Connections" value="1" />
        <ProfileInfoRow icon={Smartphone} label="App Version" value="1.1.11" />
        <ProfileInfoRow icon={Shield} label="Privacy Policy" value="" showChevron />
        <ProfileInfoRow icon={Power} label="Status" value="Active" valueColor="text-green-500" />
      </ProfileInfoRowWrapper>

       <div className="px-3 rounded-lg bg-card">
          <div className="flex items-center justify-between py-3 text-sm">
              <span className="font-medium text-primary">Reset Data</span>
          </div>
       </div>
    </div>
  );
}
