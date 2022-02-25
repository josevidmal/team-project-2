module.exports = {
    format_date: (date) => {
        const scheduleDate = new Date(date);
        const dateOptions = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };

        // Format date as MM/DD/YYYY HH:mm
        return scheduleDate.toLocaleDateString('en-US', dateOptions)
    }
  };
  