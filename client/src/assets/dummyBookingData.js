import { dummyShowsData }
from './dummyShowsData'

export const dummyBookingData =
[
  {
    _id: 1,

    show: {
      movieId: 1,
      date:
        '2026-05-16',
      timing:
        '10:15 AM',
    },

    bookedSeats: [
      'A2',
      'A3',
    ],

    amount: 1200,
    isPaid: true,
  },

  {
    _id: 2,

    show: {
      movieId: 5,
      date:
        '2026-05-15',
      timing:
        '7:15 PM',
    },

    bookedSeats: [
      'C4',
      'C5',
      'C6',
    ],

    amount: 850,
    isPaid: false,
  },

  {
    _id: 3,

    show: {
      movieId: 6,
      date:
        '2026-05-13',
      timing:
        '4:00 PM',
    },

    bookedSeats: [
      'F5',
      'F6',
      'F7',
      'F8',
    ],

    amount: 1600,
    isPaid: true,
  },
]