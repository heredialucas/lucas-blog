import { Button } from "@/components/ui/button";
import { getClientInfoByDomain } from "../../../api/util/actions";

export async function HomeHeroResume({ domain }) {
  const { client } = await getClientInfoByDomain(domain);
  
  if (!client?.resumeLink) {
    return <></>;
  }

  return (
    <Button className="btn btn-primary w-fit hover:cursor-pointer">
      <a href={client?.resumeLink} target="_blank">
        See Resume
      </a>
    </Button>
  );
}
