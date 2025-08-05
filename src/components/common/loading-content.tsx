import { Spinner } from "../ui/spinner";

export function LoadingContent() {
    return (
        <div className="flex flex-col items-center justify-center gap-4 w-full flex-1">
            <Spinner />
            <p className="text-2xl font-bold leading-none">Cargando contenido</p>
            <p className="text-sm font-medium leading-none">Por favor, espera un momento</p>
        </div>
    )
}