const config = () => {
  return {
    method: 'get',
    headers: {
      Authorization: `Bearer ${process.env.TWITTER_TOKEN}`,
    },
  };
};

// console.log('My Application Version', process.env.NEXT_PUBLIC_ANALYTICS_ID);

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      await getWorldWideTrends(req, res);
      break;

    case 'POST':
      await getTrendsByWoeid(req, res);
      break;
  }
};

const getWorldWideTrends = async (req, res) => {
  try {
    const trendsData = await fetch(
      'https://api.twitter.com/1.1/trends/place.json?id=1',
      config()
    );
    const worldWideTrends = await trendsData.json();
    return res.status(200).send(worldWideTrends);
  } catch (err) {
    console.log(err);
    res.status(error.status || 500).end(error.message);
  }
};

const getTrendsByWoeid = async (req, res) => {
  const { lat, lng } = req.body;
  try {
    const woeid = await fetch(
      `https://api.twitter.com/1.1/trends/closest.json?lat=${lat}&long=${lng}`,
      config()
    );
    const woeidData = await woeid.json();
    const trends = await fetch(
      `https://api.twitter.com/1.1/trends/place.json?id=${woeidData[0].woeid}`,
      config()
    );
    const woeidTrends = await trends.json();
    const flag = woeidData[0].countryCode;

    return res.status(200).send({ ...woeidTrends, flag: flag });
  } catch (err) {
    console.log(err);
    res.status(error.status || 500).end(error.message);
  }
};
