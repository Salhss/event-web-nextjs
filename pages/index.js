import { getFeaturedEvents } from "../helpers/api-util";
import EventItem from "@/components/events/EventItem";

export default function Home(props) {
  // menggunakan getStaticProps agar html akan lgsung di build dengan atau tanpa data (dapat di cache CDN) paling bagus untuk halaman pertama untuk SEO
  return (
    <div>
      <EventItem Item={props.events} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    /* untuk menentukan waktu (in seconds) berapa lama page akan di re-generate (di deploy ulang)*/
    revalidate: 1800,
  };
}
