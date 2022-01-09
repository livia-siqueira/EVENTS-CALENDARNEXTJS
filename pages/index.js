import { ListEvents } from "../components/events/ListEvents";
import { getFeaturedEvents } from "../helpers/api-util";
import Head from "next/head";
export default function Home({ data }) {
  return (
    <div>
      <Head>
        <title>Next Events</title>
        <meta name="description" content="Find a lot event" />
      </Head>
      <ListEvents items={data} />
    </div>
  );
}

export async function getStaticProps() {
  const events = await getFeaturedEvents();
  return {
    props: {
      data: events,
    },
    revalidate: 1800,
  };
}
