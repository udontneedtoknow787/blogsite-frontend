import { ThemeButton } from "@/components/customcomponents/themebtn";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6 dark:bg-gray-700">
      <motion.h1
        className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Welcome to Markdown Blog
      </motion.h1>
      <motion.p
        className="text-lg text-gray-600 mb-6 text-center max-w-2xl dark:text-gray-100"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        A simple and powerful platform to write, format, and publish blogs using Markdown.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:gap-4"
      >
        <Button className="px-6 py-3 text-lg rounded-lg" onClick={() => navigate("/editor")}>
          Start Writing
        </Button>
        <Button variant="outline" className="px-6 py-3 text-lg rounded-lg" onClick={() => navigate("/blogs")}>
          Explore Blogs
        </Button>
        <Button variant="secondary" className="px-6 py-3 text-lg rounded-lg" onClick={() => navigate("/register")}>
          Register
        </Button>
        <ThemeButton />
      </motion.div>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-lg p-6 bg-white rounded-2xl">
          <CardContent>
            <h3 className="text-xl font-semibold text-gray-800">Write with Ease</h3>
            <p className="text-gray-600 mt-2">Seamlessly write blogs using Markdown syntax.</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg p-6 bg-white rounded-2xl">
          <CardContent>
            <h3 className="text-xl font-semibold text-gray-800">Instant Publishing</h3>
            <p className="text-gray-600 mt-2">Publish your blogs instantly for the world to see.</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg p-6 bg-white rounded-2xl">
          <CardContent>
            <h3 className="text-xl font-semibold text-gray-800">Engage with Readers</h3>
            <p className="text-gray-600 mt-2">Get feedback and interact with a like-minded community.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
