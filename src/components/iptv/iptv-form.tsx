
"use client"

import { DosmoIptvLogo } from "@/components/common/dosmo-iptv-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from 'react';
import { BottomSheet } from "@/components/ui/bottom-sheet";
import { useXtreamCredentials } from "@/hooks/use-xtream-credentials";
import { useEncryptedPassword } from "@/hooks/use-encrypted-password";
import { useRouter } from "next/navigation";
import { httpsToHttp, isHttps } from "@/domain/url";

export function IptvForm() {
  const router = useRouter();
  const { encrypt } = useEncryptedPassword();
  const { credentials, saveCredentials } = useXtreamCredentials();
  const [listName, setListName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [url, setUrl] = useState('');
  const [urlError, setUrlError] = useState<string | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isFormValid = listName && username && password && url;

  const processForm = async () => {
    const encryptedPassword = await encrypt(password);

    saveCredentials({
      listName,
      serverUrl: url,
      username,
      encryptedPassword,
    });
    
    router.push('/movies');
  }

  const handleSend = (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();

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
      setIsLoading(false);
      return;
    }

    setUrlError(null);

    if (isHttps(url)) {
      setIsSheetOpen(true);
    } else {
      processForm();
    }
  };

  const handleUrlProtocolChange = () => {
    const unsafeUrl = httpsToHttp(url);
    setUrl(unsafeUrl);
    setIsSheetOpen(false);
    // We need to defer processing to allow state to update
    setTimeout(processForm, 10);
  };

  const handleUrlProtocolKeep = () => {
    setIsSheetOpen(false);
    // We need to defer processing to allow state to update
    setTimeout(processForm, 10);
  }

  useEffect(() => {
    if(credentials?.serverUrl) {
      router.push('/movies');
    }
  }, [credentials])

  return (
    <>
      <form onSubmit={handleSend} className="flex flex-col items-center gap-4 w-full max-w-sm">
        <DosmoIptvLogo iptv className="max-w-[250px] mb-4" />
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="list-name">Nombre de la lista</Label>
          <Input type="text" id="list-name" placeholder="Nombre de la lista" value={listName} onChange={(e) => setListName(e.target.value)} disabled={isLoading} />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="username">Usuario</Label>
          <Input type="text" id="username" placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} disabled={isLoading} />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="password">Contraseña</Label>
          <Input type="password" id="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <div className="flex items-end gap-2">
            <Label htmlFor="url">URL</Label>
            {urlError && <span className="text-primary text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{urlError}</span>}
          </div>
          <Input type="text" id="url" placeholder="URL" value={url} onChange={(e) => setUrl(e.target.value)} disabled={isLoading} />
        </div>
        <Button type="submit" className="w-full" disabled={!isFormValid} loading={isLoading}>Agregar Lista</Button>
      </form>

      <BottomSheet
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        title="Confirmación de protocolo"
        content="Podría haber un error en el protocolo de la url https, ¿quieres que lo cambie automáticamente a http?"
        onSuccess={handleUrlProtocolChange}
        onCancel={handleUrlProtocolKeep}
        successText="Cambiar a http"
        cancelText="Mantener https"
      />
    </>
  );
}
