import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import ReactLoading from "react-loading";

import PinPoke from "./components/PinPoke";

function App() {
  const [poke, setPoke] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [number, setNumber] = useState(1);
  const [pin, setPin] = useState([]);

  useEffect(() => {
    let abortController = new AbortController();

    const loadPoke = async () => {
      try {
        setLoading(true);
        let response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${number}`,
          {
            signal: abortController.signal,
          }
        );

        setPoke(response.data);
        setError("");
      } catch (error) {
        setError("Something went worng", error);
      } finally {
        setLoading(false);
      }
    };

    loadPoke();
    return () => abortController.abort();
  }, [number]);

  const prevPoke = () => {
    setNumber((number) => number - 1);
  };

  const nextPoke = () => {
    setNumber((number) => number + 1);
  };

  const addPin = () => {
    setPin((prevState) => [...prevState, poke]);
  };

  return (
    <>
      <div className="max-w-7xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 max-h-screen max-w-screen">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 max-h-screen max-w-screen">
          <div>
            {loading ? (
              <ReactLoading
                type="spokes"
                color="gray"
                height={"20%"}
                width={"20%"}
              />
            ) : (
              <>
                <button onClick={addPin}>Add to Favorite</button>
                <h1>{poke?.name}</h1>
                <div className="flex justify-center">
                  <img
                    className="h-72 w-72"
                    src={poke?.sprites?.other.home.front_default}
                    alt={poke?.name}
                  />
                </div>
                <h1> shiny {poke?.name}</h1>
                <div className="flex justify-center">
                  <img
                    className="h-72 w-72"
                    src={poke?.sprites?.other?.home.front_shiny}
                    alt={poke?.nameShiny}
                  />
                </div>
                <h2 className="text-xl font-bold">Abilities</h2>
                <ul>
                  {poke?.abilities?.map((abil, idx) => (
                    <div key={idx}>{abil.ability.name}</div>
                  ))}
                </ul>
                <div className="flex justify-between top-10">
                  <button onClick={prevPoke}>Previous</button>
                  <button onClick={nextPoke}>Next</button>
                </div>
              </>
            )}
          </div>
          <div>
            <h2>My Favourite Pokemon</h2>
            {pin.length > 0 ? (
              <PinPoke pin={pin} />
            ) : (
              <div className="flex h-full justify-center items-center">
                <p>No Favorite Pokenom right now...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
