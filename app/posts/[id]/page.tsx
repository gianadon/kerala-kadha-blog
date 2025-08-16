// BEFORE ⛔️
// export default function PostPage({ params }: PageProps) { ... }

// AFTER ✅
export default function PostPage({ params }: { params: { id: string } }) {
  const { id } = params; // You can now safely use the id

  // ... rest of your component code
  return (
    <div>
      <h1>Post ID: {id}</h1>
    </div>
  );
}