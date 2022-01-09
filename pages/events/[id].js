import { getAllEvents, getFeaturedEvents, getEventById } from "../../helpers/api-util";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert/error-alert";
import { Button } from "../../components/ui/Button";
import Head from "next/head";
const EventPage = ({eventSelected}) => {
  if (!eventSelected) {
    return (
      <>
       <div className="center">
          <p>Loading...</p>
        </div>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }
  return (
    <>
     <Head>
        <title>{eventSelected.title}</title>
        <meta name="description" content={eventSelected.description} />
      </Head>
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


export async function getStaticProps(context) {
  const id = context.params.id;
  const event = await getEventById(id);

  return{
    props: {
      eventSelected: event
    },
    revalidate: 30
  }
}

//preciso dessa função para trabalhar com valores alteraveis de params
export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  const ids = events.map(({id}) => ({params: {id: id}}));
  return {
    paths: ids,
    fallback: 'blocking',
  }
}
export default EventPage;
