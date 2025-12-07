import Headline from "../components/Headline";
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
		"Azure",
	];

	return (
		<div className="p-4 md:p-8 w-full max-w-6xl">
			<Headline title="Contact Me" subtitle="Get in touch" />

			<div className="bg-gray-800 p-6 rounded-lg space-y-6">
				<div>
					<h2 className="text-xl font-semibold mb-2">Anton Smatanik</h2>
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
							<strong>Location:</strong> Praha 6, Czech Republic
						</p>
					</div>
				</div>

				<div>
					<h3 className="text-lg font-semibold mb-3">Skills & Technologies</h3>
					<SkillBadge skills={skills} />
				</div>
			</div>
		</div>
	);
};

export default Contact;
