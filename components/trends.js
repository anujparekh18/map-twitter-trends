import { useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import ReactCountryFlag from 'react-country-flag';
import UseAnimations from 'react-useanimations';
import twitter from 'react-useanimations/lib/twitter';

export default function Trends({ trends, loading }) {
  const allTrends = trends[0].trends;
  const [show, setShow] = useState(false);
  return (
    <div className="bg-opacity-60 bg-dark-blue py-4 rounded-bl-2xl">
      <div className="h-12">
        <h2 className="font-sans font-semibold text-xl text-white text-center">
          Map Twitter Trends
        </h2>
        <h3 className="flex items-center justify-between h-14 font-sans font-semibold text-lg text-white px-3 py-3">
          <div>
            {trends.flag ? (
              <ReactCountryFlag
                countryCode={trends.flag}
                className="mr-4"
                style={{
                  width: '1.5em',
                  height: '1.5em',
                }}
                svg
              />
            ) : (
              <span role="img" aria-label="world" className="mr-4 w-4 h-4">
                🌏
              </span>
            )}
            {trends[0].locations[0].name} Trends
          </div>
          <div>
            {loading ? (
              <UseAnimations
                animation={twitter}
                strokeColor="blue"
                autoplay={true}
                loop={true}
                size={35}
              />
            ) : (
              ''
            )}
          </div>
        </h3>
      </div>
      <div className="h-96 pt-7">
        <Scrollbars style={{ width: 560, height: 360 }}>
          <ul>
            {allTrends.map((trend, index) => (
              <div key={index}>
                <li className="py-3 px-3 hover:bg-dark-blue hover:bg-opacity-30 ">
                  <a href={trend.url} target="_blank" className="flex flex-col">
                    <span className="text-white text-base font-medium">
                      {trend.name}
                    </span>
                    <span className="text-gray-300 text-sm font-normal">
                      {trend.tweet_volume} Tweet
                    </span>
                  </a>
                </li>
                <div className="border-t border-gray-500"></div>
              </div>
            ))}
          </ul>
        </Scrollbars>
      </div>
      <div className="h-auto text-white text-center pt-2">
        <div
          className="text-sm cursor-pointer flex items-center justify-center"
          onClick={() => setShow(!show)}
        >
          <img
            src="/polygon.svg"
            className={`w-3 h-3 transform ${
              show ? 'rotate-180' : 'rotate-90'
            } mr-2`}
          />
          What is this?
        </div>
        {show && (
          <div className="text-xs">
            Twitter Trends is an app where you click on a map and shows you the
            closest area's current Twitter trending topics and hashtags.
          </div>
        )}
      </div>
    </div>
  );
}
