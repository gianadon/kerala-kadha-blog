import type { Metadata } from 'next';

type Post = {
  id: string;
  createdAt: string;
  title: string;
  author: string;
  coverImage: string;
  content: string;
};

async function getPostById(id: string): Promise<Post> {
  const res = await fetch(`https://6893179cc49d24bce8696456.mockapi.io/posts/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch post');
  }

  return res.json();
}

// This is the prop type definition that fixes the error
type PageProps = {
  params: { id: string };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPostById(params.id);
  return {
    title: `${post.title} | Kerala Katha`,
    description: post.content.substring(0, 160),
  };
}

export default async function PostPage({ params }: PageProps) {
  const post = await getPostById(params.id);
  const creationDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-3">
          {post.title}
        </h1>
        <p className="text-gray-500">
          By {post.author} on {creationDate}
        </p>
      </header>
      
      <img 
        src={post.coverImage} 
        alt={post.title} 
        className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-lg mb-8"
      />

      <div className="text-lg text-gray-800 leading-relaxed whitespace-pre-line">
        {post.content}
      </div>
    </article>
  );
}