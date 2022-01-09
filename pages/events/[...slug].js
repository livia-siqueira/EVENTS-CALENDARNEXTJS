import { useRouter } from "next/router";
import { ListEvents } from "../../components/events/ListEvents";
import { getFilteredEvents } from "../../helpers/api-util";
import ResultsTitle from "../../components/ui/results-title/results-title";
import { Button } from "../../components/ui/Button";
import ErrorAlert from "../../components/ui/error-alert/error-alert";
import useSWR from "swr";
import { useEffect, useState } from "react";

const FilteredEvents = ({ hasError, date, eventsSelected }) => {
  const router = useRouter();
  const [event, setEvents] = useState([]);
  const filterData = router.query.slug;

  if (!event) {
    return <p className="center">Loading...</p>;
  }

  const yearNumb = +filterData[0];
  const monthNumb = +filterData[1];
  //client-side
  const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data, error } = useSWR(
    "https://course-next-default-rtdb.firebaseio.com/events.json",
    fetcher
  );

  useEffect(() => {
    if (data) {
      const events = [];

      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }

      setEvents(events);
    }
  }, [data]);

  let filteredEvents = event.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === yearNumb &&
      eventDate.getMonth() === monthNumb - 1
    );
  });

  /* server-side-rendering 
  if (hasError) {
    return (
      <>
        <ErrorAlert> Invalid filter</ErrorAlert>{" "}
        <div className="center">
          <Button link="/events"> Show All Events</Button>
        </div>
      </>
    );
  }
*/
  if (
    isNaN(yearNumb) ||
    isNaN(monthNumb) ||
    yearNumb > 2030 ||
    yearNumb < 2021 ||
    monthNumb < 1 ||
    monthNumb > 12 ||
    error
  ) {
    return (
      <>
        <ErrorAlert> Invalid filter</ErrorAlert>{" "}
        <div className="center">
          <Button link="/events"> Show All Events</Button>
        </div>
      </>
    );
  }
  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert> No events found the chosen filters!!</ErrorAlert>{" "}
        <div className="center">
          <Button link="/events"> Show All Events</Button>
        </div> 
      </>
    );
  }
  return (
    <div>
      <ResultsTitle date={new Date(yearNumb, monthNumb - 1)} />
      <ListEvents items={filteredEvents} />
    </div>
  );
};

//server-side
/*
export async function getServerSideProps(context) {
  const { params } = context;
  const filterData = params.slug;
  const yearNumb = +filterData[0];
  const monthNumb = +filterData[1];

  if (
    isNaN(yearNumb) ||
    isNaN(monthNumb) ||
    yearNumb > 2030 ||
    yearNumb < 2021 ||
    monthNumb < 1 ||
    monthNumb > 12
  ) {
    return {
      props: { hasError: true },
      //notFound: true,
      //redirec: {
      // destination: '/'
      //}
    };
  }
  const eventsSelected = await getFilteredEvents({
    year: yearNumb,
    month: monthNumb,
  });
  return {
    props: {
      eventsSelected: eventsSelected,
      date: {
        year: yearNumb,
        month: monthNumb,
      },
    },
  };
}
*/
export default FilteredEvents;
