const calculateDaysUntilTrip = (tripDate) => {
  const today = new Date();
  const departureDate = new Date(tripDate);
  today.setHours(0, 0, 0, 0);
  departureDate.setHours(0, 0, 0, 0);
  const timeDiff = departureDate - today;
  const daysUntilTrip = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  return daysUntilTrip > 0 ? daysUntilTrip : 0;
};

export { calculateDaysUntilTrip };
