import { ChevronRight } from "lucide-react";

export const MySpaceInfoRow = ({ icon: Icon, label, value, valueColor, showChevron }: { icon: React.ElementType, label: string, value: string, valueColor?: string, showChevron?: boolean }) => (
    <div className="flex items-center justify-between py-2 border-b border-border/50 last:border-b-0 text-sm">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-secondary rounded-full">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <span className="font-medium text-foreground">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className={`font-semibold ${valueColor || 'text-muted-foreground'}`}>{value}</span>
        {showChevron && <ChevronRight className="w-5 h-5 text-muted-foreground" />}
      </div>
    </div>
  );