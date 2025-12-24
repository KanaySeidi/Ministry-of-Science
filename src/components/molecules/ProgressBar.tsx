type Props = {
  step: number;
  steps: string[];
};

function ProgressBar({ step, steps }: Props) {
  const percent = ((step + 1) / steps.length) * 100;

  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2  text-gray-600">
        {steps.map((label, idx) => (
          <span
            key={label}
            className={idx <= step ? "text-sinii font-medium" : ""}
          >
            {label}
          </span>
        ))}
      </div>

      <div className="w-full h-2 bg-gray-200 rounded">
        <div
          className="h-2 bg-sinii rounded transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>

      <p className="mt-2 text-sm text-gray-500">
        Шаг {step + 1} из {steps.length}
      </p>
    </div>
  );
}

export default ProgressBar;
