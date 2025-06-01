import axios from 'axios';
import { useState, useEffect } from 'react';

interface Review {
  id: string;
  comment: string;
  reviewedByUser?: {
    username?: string;
  };
  createdAt?: string;
}

interface RestaurantType {
  id: string;
  name: string;
  location: string;
  reviews?: Review[];
}

function getInitials(name?: string) {
  if (!name) return '?';
  return name.split(' ').map((n) => n[0]).join('').toUpperCase();
}

export default function HomePage() {
  const [restaurants, setRestaurants] = useState<RestaurantType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await axios.get('http://localhost:3000/app/v1/restaurant/getallrestaurants', {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        setRestaurants(res.data.restaurants || []);
      } catch (err) {
        setError('Failed to fetch data');
        setRestaurants([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: `url('/assets/restaurant.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Stronger dark overlay for better contrast */}
      <div className="absolute inset-0 bg-black bg-opacity-80 z-0" />
      <div className="max-w-3xl mx-auto py-8 px-2 w-full relative z-10">
        <h1 className="text-3xl font-extrabold mb-8 text-center text-blue-100 tracking-tight drop-shadow">All Restaurants & Reviews</h1>
        {loading && (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-400 mb-4"></div>
            <div className="text-lg font-semibold text-blue-200">Loading, please wait...</div>
          </div>
        )}
        {error && <div className="text-red-400 mb-4">{error}</div>}
        <div className="space-y-8">
          {restaurants.map((rest) => (
            <div key={rest.id} className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 bg-opacity-95">
              <div className="flex items-center mb-2">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-700 mr-4 border-2 border-blue-300">
                  {getInitials(rest.name)}
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-900">{rest.name}</div>
                  <div className="text-sm text-gray-500">{rest.location}</div>
                </div>
              </div>
              <div className="mt-4">
                <div className="font-semibold mb-2 text-gray-700">Reviews:</div>
                {rest.reviews && rest.reviews.length > 0 ? (
                  <ul className="space-y-3">
                    {rest.reviews.map((review) => (
                      <li key={review.id} className="flex items-start bg-gray-50 rounded p-3 border border-gray-100">
                        <div className="h-9 w-9 rounded-full bg-blue-200 flex items-center justify-center text-lg font-bold text-blue-800 mr-3 mt-1">
                          {getInitials(review.reviewedByUser?.username)}
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">{review.reviewedByUser?.username || 'Unknown'}</div>
                          <div className="text-gray-700">{review.comment}</div>
                          {review.createdAt && (
                            <div className="text-xs text-gray-400 mt-1">{new Date(review.createdAt).toLocaleString()}</div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-gray-400 italic">No reviews yet</div>
                )}
              </div>
            </div>
          ))}
          {restaurants.length === 0 && !loading && !error && (
            <div className="text-gray-200">No restaurants found</div>
          )}
        </div>
      </div>
    </div>
  );
}