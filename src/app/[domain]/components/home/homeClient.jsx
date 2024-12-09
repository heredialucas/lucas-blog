import { HomeHeroImg } from "./homeHeroImg";
import { HomeHeroLinks } from "./homeHeroLinks";
import { HomeHeroName } from "./homeHeroName";
import { HomeHeroPaymentBtn } from "./homeHeroPaymentBtn";
import { HomeHeroResume } from "./homeHeroResume";
import { HomeHeroText } from "./homeHeroText";

export function HomeClient({ domain, isAdmin }) {
  return (
    <div className="flex flex-col-reverse md:flex-row justify-between items-center">
      <div className="flex flex-col h-full justify-between md:w-2/3 mb-8 md:mb-0">
        <HomeHeroName domain={domain} />
        <HomeHeroText domain={domain} />
        <HomeHeroResume domain={domain} />
        <HomeHeroPaymentBtn domain={domain} isAdmin={isAdmin} />
      </div>
      <div className="flex flex-col h-full md:w-1/3 justify-center  items-center">
        <HomeHeroImg domain={domain} />
        <HomeHeroLinks domain={domain} />
      </div>
    </div>
  );
}
