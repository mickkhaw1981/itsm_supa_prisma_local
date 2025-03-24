import React from "react";
import { Button } from "@/components/ui/button";
import { Inter, Space_Grotesk } from "next/font/google";

// This is a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ["latin"] });

//load space grotesk
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

const page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-4">
      <h1 className="text-4xl font-bold tracking-tight">Hello World (inter)</h1>
      <h1 className="text-4xl font-roboto font-bold tracking-normal">
        Hello World (roboto)
      </h1>
      <Button>Click me</Button>
    </div>
  );
};

export default page;
