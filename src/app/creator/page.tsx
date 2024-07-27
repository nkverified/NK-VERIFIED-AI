"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { audioTracks, client, copy, genAI } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { CircleCheck, Clapperboard, Plus } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const Creator = () => {
  const searchParams = useSearchParams();
  const query: any = searchParams.get("query");
  const [youtube, setYoutube]: any = useState({
    title: "",
    description: "",
    tags: "",
    script: "",
  });
  const [photos, setPhotos]: any = useState();
  const router = useRouter();
  const [url, setUrl]: any = useState("");
  const [bgMusic, setBgMusic]: any = useState();

  useEffect(() => {
    if (youtube.script != "") {
      const scriptv = youtube.script;
      generateVideo({ text: scriptv, images: photos }).then((e) => {
        console.log("video generated ...");
        setUrl(e);
      });
    }
  }, [youtube]);
  console.log(youtube);

  const onGenerate = async () => {
    console.log("onGenerate");
    try {
      const model = await genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: { responseMimeType: "application/json" },
      });
      let prompt = `
      Generate the content for the short video for Youtube shorts and Instagram reel using this JSON schema:
      topic for the video is ${query}
      { 
        "title": { "type": "string" },
        "description": { "type": "string" },
        "tags": { "type": "string" },
        "script": { "type": "string" }
        
      }
        write the description for youtube for the given topic with SEO optimization of around 500 words, tags will be comma seperated values, video script should only be of 1 minute and should only contain the main text no extra words. Should be ready for conversion to audio. 
      `;
      await client.photos.search({ query, per_page: 8 }).then((photos: any) => {
        console.log("generating photos ... ");
        setPhotos(photos);
      });

      await model
        .generateContent(prompt)
        .then((e) => {
          setYoutube(JSON.parse(e.response.text()));
        })
        .catch((e) => {
          console.error("Error generating video:", e);
        });
    } catch (error) {
      console.error("Error generating content:", error);
    }
  };

  return (
    <main className="bg-zinc-950 w-screen  flex p-8 h-screen ">
      <div className="font-medium overflow-y-scroll bg-black  w-full h-full border border-stone-800 rounded-3xl p-8 gap-8 flex flex-col   ">
        <div className=" flex  gap-2 justify-between  text-white w-full   ">
          <div className="flex gap-2">
            <Clapperboard strokeWidth={1} />
            <h2 className="font-semibold ">VidUI</h2>
          </div>
          <div className="text-stone-400">version 0.0.1</div>
        </div>
        <div className="flex w-full border gap-8">
          <div className="font-medium overflow-y-scroll bg-black  w-1/3 h-full  border-stone-800 rounded-3xl p-8 gap-8 flex flex-col   ">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="idea">Idea</Label>
                <Button variant={"ghost"} onClick={() => copy(youtube.title)}>
                  Copy
                </Button>
              </div>
              <Input
                type="text"
                id="idea"
                disabled
                placeholder="Enter your idea"
                value={query}
                onChange={(e) =>
                  setYoutube({ ...youtube, title: e.target.value })
                }
              />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="title">Title</Label>
                <Button variant={"ghost"} onClick={() => copy(youtube.title)}>
                  Copy
                </Button>
              </div>
              <Input
                type="text"
                id="title"
                placeholder="Enter the title"
                value={youtube.title}
                onChange={(e) =>
                  setYoutube({ ...youtube, title: e.target.value })
                }
              />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="description">Description</Label>
                <Button
                  variant={"ghost"}
                  onClick={() => copy(youtube.description)}
                >
                  Copy
                </Button>
              </div>
              <Textarea
                id="description"
                placeholder="Enter a description"
                value={youtube.description}
                onChange={(e) =>
                  setYoutube({ ...youtube, description: e.target.value })
                }
              />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="tags">Tags</Label>
                <Button variant={"ghost"} onClick={() => copy(youtube.tags)}>
                  Copy
                </Button>
              </div>
              <Input
                type="text"
                id="tags"
                placeholder="Enter tags"
                value={youtube.tags}
                onChange={(e) =>
                  setYoutube({ ...youtube, tags: e.target.value })
                }
              />
            </div>

            <div className=" font-semibold text-xl grid w-full max-w-sm items-center gap-1.5">
              <Button onClick={onGenerate}>Start Generating</Button>
            </div>
          </div>
          <div className=" w-1/3 flex flex-col gap-8 ">
            <div className="flex rounded-xl border flex-col gap-4 p-4 ">
              <Label>Images</Label>
              <div className="flex gap-4 overflow-x-scroll">
                {photos &&
                  photos.photos.map((photo: any) => {
                    return (
                      <Image
                        src={photo.src.portrait}
                        height={300}
                        width={150}
                        alt="photo"
                        className=" rounded-xl "
                      />
                    );
                  })}
              </div>
            </div>
            <div className="flex rounded-xl flex-col gap-4 p-4 overflow-hidden border  disabled">
              <Label>Choose a Background Music</Label>
              <div className="flex gap-4 h-fit">
                {audioTracks.map((track) => (
                  <AudioPlayer
                    key={track}
                    track={track}
                    onSelected={(e: any) => {
                      setBgMusic(e);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="w-1/4 ">
            <div className="flex rounded-xl  flex-col gap-4 p-4 w-full items-center ">
              <video
                src={url}
                controls
                className="w-full h-full bg-gray-100 rounded-2xl aspect-[9/16] "
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

const generateVideo = async ({ text, images }: any) => {
  try {
    const response = await fetch("http://127.0.0.1:5000/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ script: text, images: images }),
    });

    if (!response.ok) {
      throw new Error("Failed to create video");
    }
    const videoBlob = await response.blob().then((blob) => {
      return blob;
    });
    const videoUrl = await URL.createObjectURL(videoBlob);
    return videoUrl.toString();
  } catch (error: any) {
    console.error("Error creating video:", error.message);
  }
};

const converStringToArray = (value: string) => {
  return value.split(",").map((tag) => tag.trim());
};

const AudioPlayer = ({ track, onSelected }: any) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef: any = useRef(null);

  const togglePlay = () => {
    onSelected(track);
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
      setTimeout(() => {
        audioRef.current?.pause();
      }, 5000);
    }
    setIsPlaying(!isPlaying);
  };
  return (
    <div className={`h-fit flex flex-col justify-center items-center `}>
      <audio ref={audioRef} src={`/music/${track}`} />
      <button
        className="items-center place-content-center flex rounded-full p-4 w-16 h-16 text-white bg-gradient-to-t from-blue-400 to-sky-300 text-gray-950"
        onClick={togglePlay}
      >
        {isPlaying ? <CircleCheck /> : "Play"}
      </button>
    </div>
  );
};

export default Creator;
