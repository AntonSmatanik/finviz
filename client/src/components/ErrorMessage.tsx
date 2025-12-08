type ErrorMessageProps = {
  message: string;
};

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded">
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
