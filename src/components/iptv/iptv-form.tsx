import { DosmoIptvLogo } from "@/components/common/dosmo-iptv-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function IptvForm() {
  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-sm">
      <DosmoIptvLogo iptv className="max-w-[250px] mb-4" />
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="list-name">Nombre de la lista</Label>
        <Input type="text" id="list-name" placeholder="Nombre de la lista" />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="username">Usuario</Label>
        <Input type="text" id="username" placeholder="Usuario" />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="password">Contraseña</Label>
        <Input type="password" id="password" placeholder="Contraseña" />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="url">URL</Label>
        <Input type="url" id="url" placeholder="URL" />
      </div>
      <Button type="submit" className="w-full" disabled>Agregar Lista</Button>
    </div>
  );
}