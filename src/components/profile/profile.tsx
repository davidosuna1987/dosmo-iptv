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
  Tv2Icon,
  Link,
} from 'lucide-react';
import { ProfileInfoRowWrapper } from './profile-info-row-wrapper';
import { ProfileDetails } from '@/domain/xtream';

export function Profile({ details, onRefreshClick }: { details: ProfileDetails, onRefreshClick?: () => void }) {
  return (
    <div className="w-full max-w-[500px] mx-auto flex flex-col gap-4 text-sm pt-10">
      <ProfileInfoRowWrapper>
        <ProfileInfoRow icon={Tv2Icon} label="ListName" value={details.listName} />
      </ProfileInfoRowWrapper>

      <ProfileInfoRowWrapper>
        <ProfileInfoRow icon={Clapperboard} label="Películas" value={details.moviesCount.toString()} />
        <ProfileInfoRow icon={Library} label="Series" value={details.seriesCount.toString()} />
        <ProfileInfoRow icon={Tv} label="Live" value={details.liveCount.toString()} />
        <ProfileInfoRow icon={RefreshCw} label="Actualizar todo" value="" showChevron onClick={onRefreshClick} />
      </ProfileInfoRowWrapper>

      <ProfileInfoRowWrapper>
        <ProfileInfoRow icon={User} label="Username" value={details.username} />
        <ProfileInfoRow icon={Link} label="URL" value={details.serverUrl} />
        <ProfileInfoRow icon={Calendar} label="Días restantes" value={details.daysLeft} />
        <ProfileInfoRow icon={Globe} label="Zona horaria" value={details.timeZone} />
        <ProfileInfoRow icon={Calendar} label="Fecha de inicio" value={details.startDate} />
        <ProfileInfoRow icon={Calendar} label="Fecha de fin" value={details.endDate} />
        <ProfileInfoRow icon={Link2} label="Máx. conexiones" value={details.maxConnections} />
        <ProfileInfoRow icon={Smartphone} label="Versión de la aplicación" value={details.appVersion} />
        <ProfileInfoRow icon={Power} label="Estado" value="Active" valueColor={details.status === 'Active' ? 'text-green-500': 'text-red-500'} />
        <ProfileInfoRow icon={Shield} label="Política de privacidad" value="" showChevron />
      </ProfileInfoRowWrapper>
    </div>
  );
}
