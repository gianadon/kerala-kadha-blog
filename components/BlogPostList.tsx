"use client";

import { useState } from 'react';
import Link from 'next/link';

// Define a type for your Post object for better type safety
type Post = {
  id: string;
  createdAt: string;
  title: string;
  author: string;
  coverImage: string;
  content: string;
};

export default function BlogPostList({ initialPosts }: { initialPosts: Post[] }) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredPosts = initialPosts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <div className="mb-8 flex justify-center">
                <input
                    type="text"
                    placeholder="Search for a story..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full max-w-lg p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.map(post => (
                    <Link href={`/posts/${post.id}`} key={post.id} className="block group">
                        <div className="overflow-hidden rounded-lg">
                            <img src={post.coverImage} alt={post.title} className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"/>
                        </div>
                        <h2 className="text-xl font-bold mt-4 group-hover:text-blue-600 transition-colors">{post.title}</h2>
                        <p className="text-gray-600 text-sm mt-1">by {post.author}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}