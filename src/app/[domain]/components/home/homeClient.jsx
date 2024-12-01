import { Suspense } from "react";
import { HomeHeroImg } from "./homeHeroImg";
import { HomeHeroLinks } from "./homeHeroLinks";
import { HomeHeroName } from "./homeHeroName";
import { HomeHeroPaymentBtn } from "./homeHeroPaymentBtn";
import { HomeHeroResume } from "./homeHeroResume";
import { HomeHeroText } from "./homeHeroText";
import { Loading } from "@/components/custom/loading";

export function HomeClient({ domain, isAdmin }) {
  return (
    <div className="flex flex-col-reverse md:flex-row justify-between items-center">
      <div className="flex flex-col h-full justify-between md:w-2/3 mb-8 md:mb-0">
        <Suspense fallback={<Loading />}>
          <HomeHeroName domain={domain} />
        </Suspense>
        <Suspense fallback={<Loading />}>
          <HomeHeroText domain={domain} />
        </Suspense>
        <Suspense fallback={<Loading />}>
          <HomeHeroResume domain={domain} />
        </Suspense>
        <Suspense fallback={<Loading />}>
          <HomeHeroPaymentBtn domain={domain} isAdmin={isAdmin} />
        </Suspense>
      </div>
      <div className="flex flex-col h-full md:w-1/3 justify-center  items-center">
        <Suspense fallback={<Loading />}>
          <HomeHeroImg domain={domain} />
        </Suspense>
        <Suspense fallback={<Loading />}>
          <HomeHeroLinks domain={domain} />
        </Suspense>
      </div>
    </div>
  );
}
