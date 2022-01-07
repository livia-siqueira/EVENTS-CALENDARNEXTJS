import { getEventById } from "../../dummy-data";
import { useRouter } from "next/router";
import { ItemEvent } from "../../components/events/itemEvent";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert/error-alert";
import { Button } from "../../components/ui/Button";
const EventPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const eventSelected = getEventById(id);

  if (!eventSelected) {
    return (
      <>
        <ErrorAlert>No event found!!</ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }
  return (
    <>
      <EventSummary title={eventSelected.title} />
      <EventLogistics
        date={eventSelected.date}
        address={eventSelected.location}
        image={eventSelected.image}
        imageAlt={eventSelected.imageAlt}
      />
      <EventContent>
        <p>{eventSelected.description}</p>
      </EventContent>
    </>
  );
};

export default EventPage;
