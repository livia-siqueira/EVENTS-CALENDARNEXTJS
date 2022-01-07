import { useRouter } from "next/router";
import { ListEvents } from "../../components/events/ListEvents";
import { getFilteredEvents } from "../../dummy-data";
import ResultsTitle from "../../components/ui/results-title/results-title";
import { Button } from "../../components/ui/Button";
import ErrorAlert from "../../components/ui/error-alert/error-alert";

const FilteredEvents = () => {
  const router = useRouter();
  const filterData = router.query.slug;
  if (!filterData) {
    return <p className="center">Loading...</p>;
  }

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
    return (
      <>
        <ErrorAlert> Invalid filter</ErrorAlert>{" "}
        <div className="center">
          <Button link="/events"> Show All Events</Button>
        </div>
      </>
    );
  }
  const eventsSelected = getFilteredEvents({
    year: +filterData[0],
    month: +filterData[1],
  });
  if (!eventsSelected || eventsSelected.length === 0) {
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
      <ListEvents items={eventsSelected} />
    </div>
  );
};

export default FilteredEvents;
