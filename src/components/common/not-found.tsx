import Image from "next/image";

export function NotFound() {
    return (
        <div className="flex flex-col gap-4 items-center justify-center h-full mt-24 max-w-[90%] mx-auto">
            <Image
                src="/assets/images/not-found.webp"
                alt="Película o serie no encontrados"
                width={300}
                height={300}
                className="object-cover group-hover:scale-110 transition-transform duration-200  max-w-[90%]"
                data-ai-hint="not found image"
                priority
            />

            <h2 className="text-4xl font-semibold text-center">Ups... no hemos encontrado nada</h2>
        </div>
    )
}