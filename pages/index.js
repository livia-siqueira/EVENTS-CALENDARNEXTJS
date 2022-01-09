
import { ListEvents } from "../components/events/ListEvents";
import { getFeaturedEvents } from "../helpers/api-util";
export default function Home({ data }) {
  return (
    <div>
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
    revalidate: 1800
  };
}
