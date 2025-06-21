'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const chapters = [
    {
        title: 'Introducción',
        slug: 'introduccion',
        pages: [{ name: 'Bienvenida', path: '/course/introduccion' }],
    },
    {
        title: 'Capítulo 1: Fundamentos',
        slug: 'capitulo1',
        pages: [
            { name: 'Video', path: '/course/capitulo1/video' },
            { name: 'Texto', path: '/course/capitulo1/texto' },
            { name: 'Preguntas', path: '/course/capitulo1/preguntas' },
        ],
    },
    {
        title: 'Capítulo 2: Avanzado',
        slug: 'capitulo2',
        pages: [
            { name: 'Video', path: '/course/capitulo2/video' },
            { name: 'Texto', path: '/course/capitulo2/texto' },
            { name: 'Preguntas', path: '/course/capitulo2/preguntas' },
        ],
    },
];

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);
    const [expandedChapters, setExpandedChapters] = useState<string[]>(['introduccion', 'capitulo1', 'capitulo2']);
    const pathname = usePathname();

    const toggleChapter = (chapterId: string) => {
        setExpandedChapters(prev =>
            prev.includes(chapterId)
                ? prev.filter(id => id !== chapterId)
                : [...prev, chapterId]
        );
    };

    const isChapterExpanded = (chapterId: string) => {
        return expandedChapters.includes(chapterId);
    };

    const isCurrentPath = (href: string) => {
        return pathname === href;
    };

    return (
        <>
            {/* Overlay para móviles */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`
        fixed top-0 left-0 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto lg:h-full
        w-64
      `}>
                {/* Header del sidebar */}
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-semibold text-gray-800">Curso</h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="lg:hidden p-1 rounded-md hover:bg-gray-100"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Lista de capítulos */}
                <nav className="p-4 flex-1 overflow-y-auto">
                    <ul className="space-y-1">
                        {chapters.map((chapter) => (
                            <li key={chapter.slug}>
                                {/* Encabezado del capítulo */}
                                <button
                                    onClick={() => toggleChapter(chapter.slug)}
                                    className={`
                    w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors
                    ${isChapterExpanded(chapter.slug)
                                            ? 'bg-gray-100 text-gray-900'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }
                  `}
                                >
                                    <span>{chapter.title}</span>
                                    <svg
                                        className={`w-4 h-4 transition-transform duration-200 ${isChapterExpanded(chapter.slug) ? 'rotate-180' : ''
                                            }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {/* Contenido del acordeón */}
                                {isChapterExpanded(chapter.slug) && (
                                    <ul className="mt-1 ml-4 space-y-1">
                                        {chapter.pages.map((page) => (
                                            <li key={page.path}>
                                                <Link
                                                    href={page.path}
                                                    className={`
                    block px-3 py-2 rounded-md text-sm transition-colors
                    ${isCurrentPath(page.path)
                                                            ? 'bg-indigo-100 text-indigo-700 font-medium'
                                                            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                                                        }
                  `}
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    {page.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            {/* Botón para abrir sidebar en móviles */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed top-4 left-4 z-30 lg:hidden p-2 bg-white rounded-md shadow-md"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
        </>
    );
} 