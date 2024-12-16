import { HomeClient } from "./components/home/homeClient";

export default async function HomeServerSide(props) {
  const params = await props.params;
  const { domain } = params;

  return <HomeClient domain={domain} />;
}
