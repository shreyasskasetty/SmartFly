export const getShopRecommendations = async () => {
    const gateorigin = "29.985573335353482, -95.33332464290393"
    try {
      const [shops] = await Promise.all([
        fetch(`/recommend/get-rec?origin=${gateorigin}`).then(res => res.json())
      ]);
      console.log(shops)
      return shops;
    } catch (error) {
      console.error('Error fetching duration data:', error);
      throw error;
    }
  }

