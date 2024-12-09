import { getClientInfoByDomain } from "@/app/server/actions/actions";
import PaymentComponent from "@/components/stripe/payment";

export async function HomeHeroPaymentBtn({ domain }) {
  const { client } = await getClientInfoByDomain(domain);

  if (!client?.isSubscribed) {
    return <></>;
  }

  // Solo mostrar el botón si isAdmin && !client?.isSubscribed
  return (
    <div className="my-4 md:hidden">
      <PaymentComponent domain={client?.domain} />
    </div>
  );
}
