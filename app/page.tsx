import BlogPostList from "../components/BlogPostList";

type Post = {
  id: string;
  createdAt: string;
  title: string;
  author: string;
  coverImage: string;
  content: string;
};

async function getPosts(): Promise<Post[]> {
  // This URL should be your correct one from mockapi.io
  const res = await fetch('https://6893179cc49d24bce8696456.mockapi.io/posts', {
    cache: 'no-store' 
  });

  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }

  return res.json();
}

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <main className="container mx-auto px-4 py-12">
      <header className="text-center mb-16">
        <h1 className="text-5xl font-extrabold tracking-tight mb-2">Kerala Katha</h1>
        <p className="text-xl text-gray-500">A collection of stories and thoughts from the God's Own Country.</p>
      </header>

      <BlogPostList initialPosts={posts} />
    </main>
  );
}