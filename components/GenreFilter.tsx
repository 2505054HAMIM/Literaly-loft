
import React from 'react';
import { Genre } from '../types';

interface GenreFilterProps {
    genres: Genre[];
    selectedGenre: Genre | null;
    onSelectGenre: (genre: Genre | null) => void;
}

const GenreFilter: React.FC<GenreFilterProps> = ({ genres, selectedGenre, onSelectGenre }) => {
    const allGenres: (Genre | null)[] = [null, ...genres];

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-sans font-bold text-accent mb-4 border-b pb-2">Browse Genres</h3>
            <ul className="space-y-2">
                {allGenres.map((genre, index) => {
                    const isActive = selectedGenre === genre;
                    return (
                        <li key={index}>
                            <button
                                onClick={() => onSelectGenre(genre)}
                                className={`w-full text-left px-3 py-2 rounded-md transition-colors duration-200 text-sm ${
                                    isActive 
                                    ? 'bg-primary text-white font-bold' 
                                    : 'hover:bg-secondary text-gray-700'
                                }`}
                            >
                                {genre || 'All Books'}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default GenreFilter;
