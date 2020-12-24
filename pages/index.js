import { useState } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import Trends from '../components/trends';
import Head from 'next/head';
import baseUrl from '../helpers/baseUrl';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
};
const center = {
  lat: 20.5937,
  lng: 78.9629,
};

export default function IndexPage({ trends }) {
  const [trendingTopic, setTrendingTopic] = useState(trends);
  const [loading, setLoading] = useState(false);
  const flagUrlIcon = `https://www.countryflags.io/${trendingTopic.flag}/flat/32.png`;
  const worldIcon = '/World-icon.png';
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API,
    libraries,
  });
  const [marker, setMarker] = React.useState({ lat: 0, lng: 0 });

  const options = {
    disableDefaultUI: true,
    zoomControl: true,
  };

  const onMapClick = async (e) => {
    setLoading(true);
    setMarker({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    try {
      const res1 = await fetch(`${baseUrl}/api/trends`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lat: e.latLng.lat(), lng: e.latLng.lng() }),
      });
      const res2 = await res1.json();
      setTrendingTopic(res2);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading Maps';

  return (
    <div>
      <Head>
        <title>Map Twitter Trends</title>
        <link
          rel="icon"
          href={`${trendingTopic.flag ? flagUrlIcon : worldIcon}`}
        />
      </Head>
      <div className="w-screen">
        <div className="absolute">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={3}
            center={center}
            onClick={(e) => onMapClick(e)}
            options={options}
          >
            {trendingTopic.flag ? (
              <Marker
                position={{ lat: marker.lat, lng: marker.lng }}
                icon={{
                  url: '/Twitter.png',
                  origin: new window.google.maps.Point(0, 0),
                  anchor: new window.google.maps.Point(15, 15),
                  scaledSize: new window.google.maps.Size(30, 30),
                }}
              />
            ) : null}
          </GoogleMap>
        </div>
        <div className="relative w-80 overflow-hidden float-right">
          <Trends trends={trendingTopic} loading={loading} />
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${baseUrl}/api/trends`);
  const data = await res.json();
  return {
    props: { trends: data },
  };
}
