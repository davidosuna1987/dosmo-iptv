import { Spinner } from "../ui/spinner";

type LoadingContentProps = {
    title?: string
    message?: string
    empty?: boolean
}

export function LoadingContent({ title = "Cargando contenido", message = "Por favor, espera un momento", empty = false }: LoadingContentProps) {
    return (
        <div className="flex flex-col items-center justify-center gap-4 w-full flex-1">
            <Spinner />
            <p className="text-2xl font-bold leading-none">{empty ? "" : title}</p>
            <p className="text-sm font-medium leading-none">{empty ? "" : message}</p>
        </div>
    )
}