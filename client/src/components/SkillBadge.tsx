type SkillBadgeProps = {
	skills: string[];
};

const SkillBadge = ({ skills }: SkillBadgeProps) => {
	return (
		<div className="flex flex-wrap gap-2">
			{skills.map((skill) => (
				<span
					key={skill}
					className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm"
				>
					{skill}
				</span>
			))}
		</div>
	);
};

export default SkillBadge;
