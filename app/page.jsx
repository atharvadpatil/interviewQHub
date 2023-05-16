import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">Discover and Share
      <br />
      <span className="violet_gradient text-center">Interview Questions</span>
      </h1>
      <p className="desc text-center">
      InterviewQHub is a platform dedicated to the sharing and exchange of interview questions. It provides a community-driven space where job seekers, interviewees, and hiring managers can contribute and access a wide range of interview questions from various industries and job roles.
      </p>

      <Feed />
    </section>
  )
}

export default Home;
