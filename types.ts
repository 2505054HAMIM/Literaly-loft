export interface Book {
  id: number;
  title: string;
  author: string;
  genre: Genre;
  price: number;
  rating: number;
  coverImage: string;
  summary: string;
}

export type Genre = 'Fiction' | 'Mystery' | 'Thriller' | 'Romance' | 'Science Fiction' | 'Fantasy';

export interface CartItem {
  book: Book;
  quantity: number;
}