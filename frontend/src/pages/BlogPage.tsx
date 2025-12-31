import ThemedNavbar from "@/components/ThemedNavbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { useState } from "react";

const blogPosts = [
  {
    id: 1,
    title: "The Ultimate Guide to Visiting the Taj Mahal",
    excerpt: "Everything you need to know for a magical visit to the Taj Mahal, from the best times to go to hidden photo spots and local tips.",
    image: "/heritage-uploads/taj-mahal-dusk.jpg",
    date: "June 2024",
    author: "Team Taj Heritage",
    content: "Discover the secrets of the Taj Mahal, the best times to visit, and how to make your trip unforgettable. Dive into local legends, photography tips, and more!"
  },
  {
    id: 2,
    title: "Agra's Hidden Gems: Beyond the Taj Mahal",
    excerpt: "Discover lesser-known monuments, gardens, and experiences that make Agra a treasure trove for curious travelers.",
    image: "/heritage-uploads/ram bagh.png",
    date: "May 2024",
    author: "Team Taj Heritage",
    content: "Step off the beaten path and explore Agra's secret gardens, ancient stepwells, and vibrant bazaars. Perfect for adventurers and culture lovers!"
  },
  {
    id: 3,
    title: "Luxury Stays in Agra: Our Top Picks",
    excerpt: "A curated list of the most luxurious hotels and resorts in Agra for an unforgettable stay.",
    image: "/heritage-uploads/sikandra1.jpg",
    date: "April 2024",
    author: "Team Taj Heritage",
    content: "Indulge in opulence! We review Agra's finest hotels, from palatial suites to spa retreats, and share insider tips for a royal experience."
  },
  {
    id: 4,
    title: "Romantic Experiences for Couples in Agra",
    excerpt: "From moonlit tours of the Taj to candlelight dinners, explore the most romantic things to do in Agra.",
    image: "/heritage-uploads/romantic-taj-couples.jpg",
    date: "March 2024",
    author: "Team Taj Heritage",
    content: "Ignite the spark! Discover Agra's most enchanting experiences for couples, from private Taj Mahal tours to luxury spa escapes."
  }
];

const BlogPage = () => {
  const [selectedPost, setSelectedPost] = useState(null);

  const featured = blogPosts[0];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <ThemedNavbar />
      <main className="flex-1 pt-28 pb-12">
        {/* Hero Section with background image overlay */}
        <section className="relative h-[340px] md:h-[420px] flex items-center justify-center mb-16">
          <img src="/heritage-uploads/taj-mahal-dusk.jpg" alt="Taj Mahal at dusk" className="absolute inset-0 w-full h-full object-cover object-center opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-accent/30" />
          <div className="relative z-10 text-center text-white max-w-2xl mx-auto px-4">
            <h1 className="heading-xl mb-4 drop-shadow-lg">Stories That Inspire Your Next Adventure</h1>
            <p className="text-lg md:text-xl font-medium drop-shadow-md mb-6">Unlock the secrets, romance, and hidden wonders of Agra. Dive into our blog for travel inspiration, expert tips, and tales that will make you want to pack your bags!</p>
            <span className="inline-block bg-accent text-white font-semibold px-4 py-2 rounded-full shadow-lg animate-bounce">New: {featured.title}</span>
          </div>
        </section>

        {/* Featured Post */}
        <section className="container-custom mb-12">
          <div className="bg-white rounded-xl shadow-lg flex flex-col md:flex-row overflow-hidden hover:scale-[1.01] transition-transform duration-300">
            <img src={featured.image} alt={featured.title} className="h-64 md:h-auto md:w-1/2 object-cover" />
            <div className="p-8 flex flex-col justify-center flex-1">
              <h2 className="font-playfair text-3xl font-bold mb-2 text-foreground">{featured.title}</h2>
              <p className="text-muted-foreground mb-4 text-lg">{featured.excerpt}</p>
              <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                <span>{featured.date}</span>
                <span>by {featured.author}</span>
              </div>
              <button onClick={() => setSelectedPost(featured)} className="btn-primary w-fit">Read Full Story</button>
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="container-custom">
          <h3 className="heading-lg mb-8 text-center text-foreground">Latest Articles</h3>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.slice(1).map(post => (
              <div key={post.id} className="bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all overflow-hidden flex flex-col group cursor-pointer" onClick={() => setSelectedPost(post)}>
                <div className="relative">
                  <img src={post.image} alt={post.title} className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <span className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-xs font-semibold shadow">Featured</span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h2 className="font-playfair text-xl font-semibold mb-2 text-foreground group-hover:underline">{post.title}</h2>
                  <p className="text-muted-foreground mb-4 flex-1">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span>{post.date}</span>
                    <span>by {post.author}</span>
                  </div>
                  <span className="btn-primary mt-auto w-fit">Read More</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Modal for post preview */}
        {selectedPost && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4" onClick={() => setSelectedPost(null)}>
            <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-8 relative animate-fade-in" onClick={e => e.stopPropagation()}>
              <button className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-accent" onClick={() => setSelectedPost(null)}>&times;</button>
              <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-48 object-cover rounded mb-4" />
              <h2 className="font-playfair text-2xl font-bold mb-2 text-foreground">{selectedPost.title}</h2>
              <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                <span>{selectedPost.date}</span>
                <span>by {selectedPost.author}</span>
              </div>
              <p className="text-gray-700 text-lg mb-2">{selectedPost.content}</p>
              <button className="btn-primary mt-4" onClick={() => setSelectedPost(null)}>Close</button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default BlogPage; 