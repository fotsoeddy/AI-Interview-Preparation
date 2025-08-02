import Image from "next/image";
import { cn, getTechLogos } from "@/lib/utils";

interface TechIconProps {
  techStack: string[];
}

const DisplayTechIcons = async ({ techStack }: TechIconProps) => {
  console.log("Tech stack received:", techStack); // Debug log
  const techIcons = await getTechLogos(techStack);

  if (!techIcons.length) {
    return <p className="text-sm text-gray-500">No tech icons available</p>;
  }

  return (
    <div className="flex flex-row">
      {techIcons.slice(0, 3).map(({ tech, url }, index) => (
        <div
          key={tech}
          className={cn(
            "relative group bg-dark-300 rounded-full p-2 flex flex-center",
            index >= 1 && "-ml-3"
          )}
        >
          <span className="tech-tooltip">{tech}</span>
          <Image
            src={url}
            alt={tech}
            width={24}
            height={24}
            className="size-6"
            onError={(e) => {
              console.error(`Failed to load icon for ${tech}: ${url}`);
              e.currentTarget.src =
                "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/devicon/devicon-original.svg"; // CDN fallback
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default DisplayTechIcons;