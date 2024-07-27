"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpRight, Sparkles } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [topic, setTopic] = useState("");
  const router = useRouter();


  const nextPage = () => {
    router.push("/creator?query="+topic)
  }

  return (
    <main className=" w-screen h-screen  bg-[#010108] flex items-center place-content-center">
      <Image
        alt="background"
        className="w-3/4 h-3/4 -mt-40 select-none   absolute  bg-gray-100 bg-transparent"
        src="/bg.svg"
        width={1000}
        height={1000}
      />
      <div className="flex flex-col gap-8 z-10 ">
        <div className="flex flex-col text-center  items-center text-4xl leading-relaxed gap-2 text-white ">
          <h2>Create YouTube Shorts and <br/> Instagram Reels in Minutes with AI</h2>
        </div>
        <div className=" p-4 rounded-xl flex    gap-4  ">
          {/* <Label htmlFor="topic">Enter your topic</Label> */}
          <Input
            id="topic"
            className="text-xl rounded-full h-12 font-bold"
            type="text"
            value={topic}
            onChange={e => setTopic(e.target.value)}
            placeholder="your idea here..."
          />
          <Button onClick={nextPage} className="flex gap-2 active:bg-[#8DDA12]  w-12 h-12 rounded-full text-black bg-[#A8FF1C]">
            <ArrowUpRight />
          </Button>
        </div>
      </div>
    </main>
  );
}
