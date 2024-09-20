import { useState } from 'react';
import './App.css';
import HeartIcon from './components/HeartIcon';
import SpinnerIcon from './components/SpinnerIcon';
import { DiApple } from 'react-icons/di';

function App() {
  const [liked, setLiked] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  const handleLikeButton = () => {
    setIsFetching(true);
    setError(null);
    getApiData();
    // setLiked(!liked);
  };

  const getApiData = async () => {
    try {
      const response = await fetch('https://www.greatfrontend.com/api/questions/like-button', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: liked ? 'unlike' : 'like' })
      }
      );
      if (response.status >= 200 && response.status < 300) {
        setLiked(!liked);
      } else {
        const res = await response.json();
        setError(res.message);
        return;
      }
      console.log(await response.json());
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div className="App">
      <h1>Like Button Using React</h1>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button disabled={isFetching} className={`like-btn ${liked ? 'likedBtn' : ''}`} onClick={handleLikeButton}>
          {isFetching ? <SpinnerIcon /> : <HeartIcon />} {liked ? 'Liked' : 'Like'}
        </button>
        <div >{error && <p style={{ fontSize: '15px' }}>{error}</p>}</div>
      </div>
    </div>
  );
}

export default App;
