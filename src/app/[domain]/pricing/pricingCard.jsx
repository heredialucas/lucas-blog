import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function PricingCard({
  title,
  price,
  currency,
  period,
  features,
  buttonText,
  link,
  disabled,
  client,
}) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline mb-4">
          <span className="text-5xl font-extrabold">{price}</span>
          <span className="text-xl font-medium ml-1">{currency}</span>
          {period && <span className="text-gray-500 ml-2">/{period}</span>}
        </div>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <svg
                className="w-5 h-5 text-green-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <a
          href={`${link}?prefilled_email=${client.email}`}
          className="btn btn-primary w-full"
          target="_blank"
          disabled={disabled}
        >
          {buttonText}
        </a>
      </CardFooter>
    </Card>
  );
}
