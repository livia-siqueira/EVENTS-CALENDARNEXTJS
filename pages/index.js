import Head from 'next/head'
import Image from 'next/image'
import { ListEvents } from '../components/events/ListEvents';
import { getFeaturedEvents } from '../dummy-data'
import styles from '../styles/Home.module.css'

export default function Home() {

  const FeaturedEvents = getFeaturedEvents();
  return (
    <div>
      <ListEvents items={FeaturedEvents}/>
    </div>
  )
}
