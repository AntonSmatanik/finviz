import Headline from "../components/Headline";
import PageContainer from "../components/PageContainer";
import SkillBadge from "../components/SkillBadge";

const Contact = () => {
  const skills = [
    "React",
    "Next.js",
    "Angular",
    "Vue.js",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Express",
    "SQL",
    "Material-UI",
    "Bootstrap",
    "Tailwind CSS",
    "Docker",
    "Kubernetes",
    "Jenkins",
    "AWS",
    "Azure"
  ];

  return (
    <PageContainer>
      <Headline
        title="Anton Smatanik"
        subtitle="I am a battle-hardened Senior full stack web developer and Team lead."
      />

      <div className="bg-gray-800 p-6 rounded-lg space-y-6">
        <div>
          <div className="my-4">
            <h3 className="text-lg font-semibold mb-3">
              Skills & Technologies
            </h3>
            <SkillBadge skills={skills} />
          </div>
          <div className="space-y-2 text-gray-300">
            <p>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:smatanik.anton@gmail.com"
                className="text-blue-400 hover:text-blue-300"
              >
                smatanik.anton@gmail.com
              </a>
            </p>
            <p>
              <strong>LinkedIn:</strong>{" "}
              <a
                href="https://www.linkedin.com/in/anton-smatanik"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                linkedin.com/in/anton-smatanik
              </a>
            </p>
            <p>
              <strong>Location:</strong>{" "}
              <a
                href="https://www.google.com/maps/place/Praha+6"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                Praha 6, Czech Republic
              </a>
            </p>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Contact;
