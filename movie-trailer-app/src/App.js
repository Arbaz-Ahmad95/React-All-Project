// App..js

import './App.css';
import { useState } from 'react';
import ReactPlayer from 'react-player';
import movieTrailer from 'movie-trailer';

function App() {

    //Setting up the initial states using
    // react hook 'useState"
    const [video, setVideo] = useState("inception");
    const [videoURL, setVideoURL] =
        useState("https://youtube.com/shorts/UHxXMapoO1o?si=MLkO3Twk2iuusOKH");

    //A function to fetch the required URL
    // and storing it inside the
    // videoURL state variableeee
    function handleSearch() {
        movieTrailer(video).then((res) => {
            setVideoURL(res);
        });
    }

    return (
        <div className="App">
            <div className="search-box">
                <label>
                    Search for any movies/shows:{" "}
                </label>
                <input type="text" onChange=
                    {(e) => { setVideo(e.target.value) }} />

                <button onClick={() => { handleSearch() }}>
                    Search
                </button>
            </div>

      // Using 'ReactPlayer' component to
            // display the video
            <ReactPlayer url={videoURL} controls={true} />
        </div>
    );
}

export default App;
