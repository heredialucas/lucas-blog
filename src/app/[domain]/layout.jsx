import { FooterServerSide } from "./footerServerSide";
import { NavServerSide } from "./navServerSide";

export default async function HomeLayout(props) {
  const params = await props.params;

  const {
    children
  } = props;

  const { domain } = params;
  return (
    <>
      <NavServerSide domain={domain} />
      {children}
      <FooterServerSide domain={domain} />
    </>
  );
}
