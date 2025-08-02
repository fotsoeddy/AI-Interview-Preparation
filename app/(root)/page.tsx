import Link from "next/link";
import Image from "next/image";
import {  getCurrentUser } from "@/lib/actions/auth.action";
import { signOut as signOutAction } from "@/lib/actions/auth.action";
import {
  getInterviewsByUserId,
  getLatestInterviews,
} from "@/lib/actions/general.action";

import { Button } from "@/components/ui/button";
import InterviewCardWrapper from "@/components/InterviewCardWrapper";


async function Home() {
  const user = await getCurrentUser();

  const [userInterviews, allInterview] = await Promise.all([
    getInterviewsByUserId(user?.id!),
    getLatestInterviews({ userId: user?.id! }),
  ]);

  const hasPastInterviews = userInterviews?.length! > 0;
  const hasUpcomingInterviews = allInterview?.length! > 0;

  return (
    <div className="relative">
      {/* {user && (
  <form action={signOutAction} className="absolute top-0 right-0 mt-4 mr-4">
    <Button type="submit" variant="outline">
      Logout
    </Button>
  </form>
)} */}

      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
          <p className="text-lg">
            Practice real interview questions & get instant feedback
          </p>

          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>

        <Image
          src="/robot.png"
          alt="robo-dude"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>

      <section className="flex flex-col gap-6 mt-8">
  <h2>Your Interviews</h2>

  <div className="interviews-section">
    {hasPastInterviews ? (
      userInterviews?.map((interview) => (
        <InterviewCardWrapper
          key={interview.id}
          userId={user?.id}
          interviewId={interview.id}
          role={interview.role}
          type={interview.type}
          techstack={interview.techstack}
          createdAt={interview.createdAt}
        />
      ))
    ) : (
      <p>You haven&apos;t taken any interviews yet</p>
    )}
  </div>
</section>

<section className="flex flex-col gap-6 mt-8">
  <h2>Take Interviews</h2>

  <div className="interviews-section">
    {hasUpcomingInterviews ? (
      allInterview?.map((interview) => (
        <InterviewCardWrapper
          key={interview.id}
          userId={user?.id}
          interviewId={interview.id}
          role={interview.role}
          type={interview.type}
          techstack={interview.techstack}
          createdAt={interview.createdAt}
        />
      ))
    ) : (
      <p>There are no interviews available</p>
    )}
  </div>
</section>

    </div>
  );
}

export default Home;
