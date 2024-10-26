export default function TimelineItem({
  startDate,
  endDate,
  company,
  title,
  description,
  index,
}) {
  return (
    <div className="flex mb-0">
      <div className="relative flex flex-col items-center">
        <div className="h-full w-0.5 bg-gradient-to-b from-blue-200 to-purple-200"></div>
        <div
          className={`absolute w-4 h-4 rounded-full ${
            index % 2 === 0 ? "bg-blue-100" : "bg-purple-100"
          } border-2 ${
            index % 2 === 0 ? "border-blue-200" : "border-purple-200"
          } -left-1.5 flex items-center justify-center`}
        ></div>
      </div>

      <div className="flex-1 pl-8 pb-16">
        <div
          className={`rounded-lg p-6 transition-all hover:shadow-md ${
            index % 2 === 0 ? "bg-blue-50/50" : "bg-purple-50/50"
          }`}
        >
          <div className="flex flex-col md:flex-row justify-between mb-2">
            <h3 className="text-lg md:text-xl font-semibold ">
              {title}
            </h3>
          </div>
          <div className="flex mb-4 gap-6">
            <span
              className={`text-sm ${
                index % 2 === 0 ? "text-blue-600" : "text-purple-600"
              } font-medium`}
            >
              {startDate} - {endDate}
            </span>
            <span className="text-gray-600 text-sm  block">{company}</span>
          </div>
          {description.length > 0 && (
            <ul className="space-y-2.5">
              {description.map((point, idx) => (
                <li key={idx} className="flex items-start">
                  <span
                    className={`mr-2 mt-1.5 h-1.5 w-1.5 rounded-full ${
                      index % 2 === 0 ? "bg-blue-300" : "bg-purple-300"
                    }`}
                  ></span>
                  <span className="text-gray-700 text-sm leading-relaxed">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
