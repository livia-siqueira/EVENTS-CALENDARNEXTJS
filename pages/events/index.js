import { ListEvents } from "../../components/events/ListEvents";
import { getAllEvents } from "../../helpers/api-util";
import EventsSearch from "../../components/events/EventSearch";
import { useRouter } from "next/router";
const AllEvents = ({events}) => {
  const router = useRouter();
  const onSearch = (year, month) => {
    const fullPath = `/events/${year}/${month}`  
    router.push(fullPath);
  };
  return (
    <div>
      <EventsSearch onSearch={onSearch} />
      <ListEvents items={events} />
    </div>
  );
};



export async function getStaticProps() {
  const events = await getAllEvents();
  return {
    props: {
      events: events
    },
    revalidate: 60
  }
}
export default AllEvents;
