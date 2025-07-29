import { RefreshCw, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function TopBar() {
  return (
    <div className="flex items-center justify-between h-12 mt-2">
      <h1 className="text-lg font-bold">Hola MyChannels</h1>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" aria-label="Refrescar">
          <RefreshCw className="w-6 h-6" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Buscar">
          <Search className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}
