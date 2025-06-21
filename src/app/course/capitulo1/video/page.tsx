export default function Capitulo1Video() {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-6 lg:p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">
                    Capítulo 1 - Video
                </h1>

                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Fundamentos Básicos
                    </h2>
                    <p className="text-gray-700 mb-6">
                        En este video aprenderás los conceptos fundamentales que necesitas conocer para comenzar tu aprendizaje.
                        Presta atención a los detalles y toma notas de los puntos más importantes.
                    </p>
                </div>

                {/* Contenedor del video */}
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                        className="absolute top-0 left-0 w-full h-full rounded-lg"
                        src="https://www.youtube.com/embed/deDiQOxuAGc?si=BNuXUJ97CJ88Puf5"
                        title="Capítulo 1 - Fundamentos Básicos"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    ></iframe>
                </div>

                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                        Resumen del video
                    </h3>
                    <p className="text-gray-700">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                </div>
            </div>
        </div>
    );
} 