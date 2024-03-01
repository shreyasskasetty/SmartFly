export const fetchFlightDetails = async () =>{
    try {
      // Example of calling the API endpoint
      const response = await fetch('/flight-details/get-flight-details/');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = response.json();
      console.log(data);
      return data;
     // Set the data into state
    } catch (e) {
        console.error('Error fetching flight data:', e);    
    }
  }
