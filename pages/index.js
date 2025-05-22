import Head from 'next/head';
import EventDecorBooking from '../components/EventDecorBooking';

export default function Home() {
  return (
    <>
      <Head>
        <title>Golden Elephant Events</title>
        <meta name="description" content="Golden Elephant Event Decor Booking" />
      </Head>
      <main>
        <EventDecorBooking />
      </main>
    </>
  );
}
