import InterviewCard from "./InterviewCard";
import { getFeedbackByInterviewId } from "@/lib/actions/general.action";

interface InterviewCardWrapperProps {
  interviewId: string;
  userId: string;
  role: string;
  type: string;
  techstack: string[];
  createdAt: Date;
}

const InterviewCardWrapper = async ({
  interviewId,
  userId,
  role,
  type,
  techstack,
  createdAt,
}: InterviewCardWrapperProps) => {
  // Sanitize techstack to fix typos and spaces
  const sanitizedTechstack = techstack.map((tech) => {
    const lowerTech = tech.toLowerCase().trim();
    return lowerTech === "reacct" ? "react" : lowerTech === "c#" ? "csharp" : lowerTech;
  });
  console.log("Raw techstack from props:", techstack); // Debug log
  console.log("Sanitized techstack:", sanitizedTechstack); // Debug log

  const feedback =
    userId && interviewId
      ? await getFeedbackByInterviewId({ interviewId, userId })
      : null;

  return (
    <InterviewCard
      interviewId={interviewId}
      userId={userId}
      role={role}
      type={type}
      techstack={sanitizedTechstack}
      createdAt={createdAt}
      feedback={feedback}
    />
  );
};

export default InterviewCardWrapper;