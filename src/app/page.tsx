import { SiteNavigationCard } from './_components/SiteNavigationCard'
import { HydrateClient } from '@/trpc/server'

export default async function Home() {
  return (
    <HydrateClient>
      <SiteNavigationCard />
    </HydrateClient>
  )
}
