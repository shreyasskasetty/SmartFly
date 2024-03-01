export const getTotalDuration = async (origin, destination) => {
    const tsaorigin = "29.98682275767087, -95.34796321222449"
    const gatedestination = "29.985573335353482, -95.33332464290393"
    try {
      // Parallel API calls
      console.log(`/arrival-time/calculate-arrival?origin=${origin}&destination=${destination}`)
      const [arrivalTimeResponse, tsaWaitTimeResponse, gateTimeResponse] = await Promise.all([
        fetch(`/arrival-time/calculate-arrival?origin=${origin}&destination=${destination}`).then(res => res.json()),
        fetch('/tsa-wait-time/get-wait-time').then(res => res.json()),
        fetch(`/gates/get-walk-time?origin=${tsaorigin}&destination=${gatedestination}`).then(res => res.json())
      ]);
  
      // Extract the durations from the responses
      const arrivalTimeDuration = arrivalTimeResponse.arrival_time; // assuming the response has a duration field
      const tsaWaitTimeDuration = tsaWaitTimeResponse.tsa_wait_time; // assuming the response has a duration field
      const gateTimeDuration = gateTimeResponse.arrival_time; // assuming the response has a duration field
      // Sum the durations (assuming they're already in minutes)
      const totalDuration = arrivalTimeDuration + tsaWaitTimeDuration + gateTimeDuration;
      
      return totalDuration;
    } catch (error) {
      console.error('Error fetching duration data:', error);
      throw error;
    }
  }

  export const getDurationToShop = async (shopLocation) => {
    const tsaorigin = "29.98682275767087, -95.34796321222449"
    try {
      const [shopTimeResponse] = await Promise.all([
        fetch(`/gates/get-walk-time?origin=${tsaorigin}&destination=${shopLocation}`).then(res => res.json())
      ]);
      return shopTimeResponse.arrival_time;
    } catch (error) {
      console.error('Error fetching duration data:', error);
      throw error;
    }
  }

  export const getDurationToGate = async (shopLocation) => {
    const gatedestination = "29.985573335353482, -95.33332464290393"
    try {
      const [shopTimeResponse] = await Promise.all([
        fetch(`/gates/get-walk-time?origin=${shopLocation}&destination=${gatedestination}`).then(res => res.json())
      ]);
      return shopTimeResponse.arrival_time;
    } catch (error) {
      console.error('Error fetching duration data:', error);
      throw error;
    }
  }


