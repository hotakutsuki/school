export default function Capitulo2Video() {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-6 lg:p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">
                    Capítulo 2 - Video
                </h1>

                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Conceptos Avanzados
                    </h2>
                    <p className="text-gray-700 mb-6">
                        En este video profundizaremos en conceptos más avanzados que te ayudarán a consolidar tu conocimiento.
                        Asegúrate de haber completado el capítulo anterior antes de continuar.
                    </p>
                </div>

                {/* Contenedor del video */}
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                        className="absolute top-0 left-0 w-full h-full rounded-lg"
                        src="https://www.youtube.com/embed/deDiQOxuAGc?si=BNuXUJ97CJ88Puf5"
                        title="Capítulo 2 - Conceptos Avanzados"
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
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </div>
            </div>
        </div>
    );
} 