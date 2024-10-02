"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ProfilePicture from "./public/evePicture.png";
import { Instagram, Linkedin, Home } from "lucide-react";

export default function Portfolio() {
  const [currentSection, setCurrentSection] = useState("home");
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Navigating the World of Pharmaceutical Innovation",
      content:
        "Discover how cutting-edge research in pharmaceutical chemistry is driving new treatments and reshaping modern healthcare. Learn about the latest advancements in drug formulation and in silico investigations that are changing the industry.",
      category: "Pharmaceutical Research",
      author: "Dr. Emma White",
      date: "3h ago",
    },
    {
      id: 2,
      title: "From Lab to Market: The Journey of a Cosmetic Product",
      content:
        "Uncover the process behind the development of medical cosmetic formulations. From initial research to final product release, explore the stages that ensure safety and effectiveness in skincare innovations.",
      category: "Cosmetic Science",
      author: "Sarah Johnson",
      date: "1d ago",
    },
    {
      id: 3,
      title: "Pharmacy Internships: Building a Career in Healthcare",
      content:
        "Explore how internships in various pharmaceutical fields provide invaluable hands-on experience. Learn tips on securing an internship and making the most out of this essential step towards a successful career as a pharmacist.",
      category: "Career Development",
      author: "Lucas Heredia",
      date: "2d ago",
    },
    {
      id: 4,
      title: "The Rise of Personalized Medicine in Modern Pharmacies",
      content:
        "Personalized medicine is revolutionizing how pharmacies serve patients. This post delves into the latest trends in pharmaceutical compounding, enabling tailored treatments that meet individual health needs.",
      category: "Healthcare Trends",
      author: "Maria Gomez",
      date: "1h ago",
    },
    {
      id: 5,
      title: "Breaking Down the Complexities of Cloud-Based Pharmacy Systems",
      content:
        "Cloud computing is transforming pharmacy management. Discover how cloud-based systems streamline operations, improve patient care, and ensure data security in today’s digital healthcare environment.",
      category: "Tech in Healthcare",
      author: "John Stevens",
      date: "3d ago",
    },
  ]);

  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "",
  });

  const addPost = () => {
    if (newPost.title && newPost.content && newPost.category) {
      setPosts([
        {
          id: Date.now(),
          ...newPost,
          author: "Ana Doe",
          date: "Just now",
        },
        ...posts,
      ]);
      setNewPost({ title: "", content: "", category: "" });
    }
  };

  const removePost = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#FFF8E7] p-6">
      <div className="max-w-6xl mx-auto">
        <nav className="flex justify-between mb-12 items-center">
          <Button
            variant="ghost"
            onClick={() => setCurrentSection("home")}
            className="text-gray-600 hover:text-gray-900"
          >
            <Home className="mr-2 h-4 w-4" /> Home
          </Button>
          <div className="space-x-6 text-gray-600">
            <a
              href="#"
              onClick={() => setCurrentSection("works")}
              className="hover:text-gray-900"
            >
              Works
            </a>
            <a
              href="#"
              onClick={() => setCurrentSection("blog")}
              className="hover:text-gray-900"
            >
              Blog
            </a>
            <a
              href="#"
              onClick={() => setCurrentSection("contact")}
              className="hover:text-gray-900"
            >
              Contact
            </a>
          </div>
        </nav>

        {currentSection === "home" && (
          <>
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between mb-12">
              <div className="md:w-2/3 mb-8 md:mb-0">
                <h1 className="text-4xl font-bold mb-2">{"Hi! I'm Eve 🙋🏼‍♀️"}</h1>

                <p className="text-gray-600 mb-6 max-w-xl">
                  As an innovative pharmacist, I bring diverse experience across
                  various pharmaceutical fields. My research background includes
                  a Co-Authorship on a Master thesis exploring in silico
                  methods. I am passionate about digital tools to advance
                  computational pharmaceutical research and leveraging digital
                  health solutions.
                </p>
                <p className="text-gray-600 mb-6 max-w-xl">
                  My experience also extends to pharmaceutical innovation and AI
                  applications, having participated in numerous congresses
                  related to pharmacy education and research across Europe and
                  Latin America.
                </p>
                <p className="text-gray-600 mb-6 max-w-xl">
                  I’m committed to advancing pharmacy by embracing emerging
                  trends and opportunities.
                </p>
                <Button className="bg-[#8B7D6B] hover:bg-[#6B5D4B] text-white">
                  Download Resume
                </Button>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <Image
                  src={ProfilePicture}
                  alt="Ana's profile picture"
                  width={300}
                  height={300}
                  className="rounded-full object-cover"
                />
              </div>
            </div>

            <div className="flex justify-center space-x-4 mb-12">
              <a
                href="https://www.instagram.com/eve_thechief/"
                target="_blank"
                className="text-gray-600 hover:text-[#8B7D6B]"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/evelyn-hafele-446406261/"
                target="_blank"
                className="text-gray-600 hover:text-[#8B7D6B]"
              >
                <Linkedin size={24} />
              </a>
              {/* <a href="#" className="text-gray-600 hover:text-[#8B7D6B]">
                <Twitter size={24} />
              </a> */}
            </div>
          </>
        )}

        {(currentSection === "home" || currentSection === "blog") && (
          <div className="bg-[#E6DFD1] rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-[#4A4033]">
                Recent Posts
              </h3>
              <a
                href="#"
                onClick={() => setCurrentSection("blog")}
                className="text-[#4A4033] hover:underline"
              >
                View All
              </a>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {posts.map((post) => (
                <Card key={post.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="text-sm font-semibold text-[#8B7D6B] mb-2">
                      {post.category}
                    </div>
                    <CardTitle className="text-lg mb-2">{post.title}</CardTitle>
                    <p className="text-gray-600 text-sm mb-4">{post.content}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{post.author}</span>
                      <span>{post.date}</span>
                    </div>
                    {currentSection === "blog" && (
                      <Button
                        variant="destructive"
                        onClick={() => removePost(post.id)}
                        className="mt-2 w-full"
                      >
                        Delete Post
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
            {currentSection === "blog" && (
              <Card>
                <CardHeader>
                  <CardTitle>Add New Post</CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    placeholder="Post Title"
                    value={newPost.title}
                    onChange={(e) =>
                      setNewPost({ ...newPost, title: e.target.value })
                    }
                    className="mb-2"
                  />
                  <Input
                    placeholder="Category"
                    value={newPost.category}
                    onChange={(e) =>
                      setNewPost({ ...newPost, category: e.target.value })
                    }
                    className="mb-2"
                  />
                  <Textarea
                    placeholder="Post Content"
                    value={newPost.content}
                    onChange={(e) =>
                      setNewPost({ ...newPost, content: e.target.value })
                    }
                    className="mb-2"
                  />
                  <Button
                    onClick={addPost}
                    className="w-full bg-[#8B7D6B] hover:bg-[#6B5D4B] text-white"
                  >
                    Add Post
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {currentSection === "works" && (
          <div className="bg-[#E6DFD1] rounded-lg p-6">
            <h3 className="text-xl font-semibold text-[#4A4033] mb-4">
              My Works
            </h3>
            <p className="text-gray-600 mb-4">
              Here you can showcase your projects and achievements.
            </p>
            <Button
              onClick={() => setCurrentSection("home")}
              className="bg-[#8B7D6B] hover:bg-[#6B5D4B] text-white"
            >
              Back to Home
            </Button>
          </div>
        )}

        {currentSection === "contact" && (
          <div className="bg-[#E6DFD1] rounded-lg p-6">
            <h3 className="text-xl font-semibold text-[#4A4033] mb-4">
              Contact Me
            </h3>
            <form className="space-y-4">
              <Input placeholder="Your Name" />
              <Input placeholder="Your Email" type="email" />
              <Textarea placeholder="Your Message" />
              <Button className="w-full bg-[#8B7D6B] hover:bg-[#6B5D4B] text-white">
                Send Message
              </Button>
            </form>
            <Button
              onClick={() => setCurrentSection("home")}
              className="mt-4 bg-[#8B7D6B] hover:bg-[#6B5D4B] text-white"
            >
              Back to Home
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
