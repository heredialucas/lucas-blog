import { HomeClient } from "./components/home/homeClient";

export const revalidate = 86400; // 1 day

export default async function HomeServerSide(props) {
  const params = await props.params;
  const { domain } = params;

  return <HomeClient domain={domain} />;
}
