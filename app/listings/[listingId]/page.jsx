import getListingById from '@/app/actions/getListingById';
import EmptyState from '@/app/components/EmptyState';
import React from 'react'
import ListingClient from './ListingClient';
import getCurrentUser from '@/app/actions/getCurrentUser';
import getReservations from '@/app/actions/getReservations';


const ListingPage = async ({params}) => {
    const listing = await getListingById(params);
    const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return (
        <EmptyState />
    );
  }

  return (
      <ListingClient
        listing={listing}
        reservations={reservations}
        currentUser={currentUser}
      />
  );
}

export default ListingPage;