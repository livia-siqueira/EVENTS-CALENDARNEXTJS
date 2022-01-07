import { ListEvents } from "../../components/events/ListEvents";
import { getAllEvents } from "../../dummy-data";
import EventsSearch from "../../components/events/EventSearch";
import { useRouter } from "next/router";
const AllEvents = () => {
  const allEvents = getAllEvents();
  const router = useRouter();
  const onSearch = (year, month) => {
    const fullPath = `/events/${year}/${month}`  
    router.push(fullPath);
  };
  return (
    <div>
      <EventsSearch onSearch={onSearch} />
      <ListEvents items={allEvents} />
    </div>
  );
};

export default AllEvents;
