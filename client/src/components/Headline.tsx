type HeadlineProps = {
  title: string;
  subtitle?: string;
};

const Headline = ({ title, subtitle }: HeadlineProps) => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl md:text-4xl font-bold text-center">{title}</h1>
      {subtitle && <p className="text-center text-gray-400 mt-2">{subtitle}</p>}
    </div>
  );
};

export default Headline;
