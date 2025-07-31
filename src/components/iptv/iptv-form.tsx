"use client"

import { DosmoIptvLogo } from "@/components/common/dosmo-iptv-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from 'react';

export function IptvForm() {
  const [listName, setListName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [url, setUrl] = useState('');
  const [urlError, setUrlError] = useState<string | null>(null);

  const isFormValid = listName && username && password && url;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic URL validation using a regular expression
    const urlPattern = new RegExp(
      '^(https?://)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', // fragment locator
      'i'
    );

    if (!urlPattern.test(url)) {
      setUrlError('Por favor, introduce una URL válida.');
      return;
    }

    setUrlError(null);

    // Process form data here (e.g., send to an API)
    console.log('Formulario enviado', { listName, username, password, url });
  };

  return (
    <form onSubmit={handleSend} className="flex flex-col items-center gap-4 w-full max-w-sm">
      <DosmoIptvLogo iptv className="max-w-[250px] mb-4" />
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="list-name">Nombre de la lista</Label>
        <Input type="text" id="list-name" placeholder="Nombre de la lista" value={listName} onChange={(e) => setListName(e.target.value)} />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="username">Usuario</Label>
        <Input type="text" id="username" placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="password">Contraseña</Label>
        <Input type="password" id="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <div className="flex justify-between">
          <Label htmlFor="url">URL</Label>
          {urlError && <span className="text-red-500 text-sm">{urlError}</span>}
        </div>
        <Input type="text" id="url" placeholder="URL" value={url} onChange={(e) => setUrl(e.target.value)} />
      </div>
      <Button type="submit" className="w-full" disabled={!isFormValid}>Agregar Lista</Button>
    </form>
  );
}
