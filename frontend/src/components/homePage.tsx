import axios from 'axios';
import { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaUserCircle, FaExclamationTriangle, FaTrash } from 'react-icons/fa';

interface Review {
  id: string;
  comment: string;
  reviewedByUser?: {
    username?: string;
    id?: string;
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
  const currentUserId = localStorage.getItem('userId');

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
        <h1 className="text-4xl font-extrabold mb-10 text-center text-blue-100 tracking-tight drop-shadow-lg">
          🍽️ All Restaurants & Reviews
        </h1>
        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-blue-400 border-dotted mb-4 shadow-lg"></div>
            <div className="text-xl font-semibold text-blue-200">Loading, please wait...</div>
          </div>
        )}
        {error && (
          <div className="flex items-center text-red-400 mb-6 bg-red-50 border border-red-200 rounded-lg p-3">
            <FaExclamationTriangle className="mr-2 text-xl" />
            <span>{error}</span>
          </div>
        )}
        <div className="space-y-10">
          {restaurants.map((rest) => (
            <div
              key={rest.id}
              className="bg-gradient-to-br from-blue-50 via-white to-blue-100 shadow-2xl rounded-2xl p-8 border border-blue-200 bg-opacity-95 transition-transform hover:scale-[1.025] hover:shadow-blue-200/80 duration-200"
            >
              <div className="flex items-center mb-4">
                <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center text-3xl font-bold text-blue-700 mr-5 border-2 border-blue-300 shadow">
                  {getInitials(rest.name)}
                </div>
                <div>
                  <div className="flex items-center gap-2 text-2xl font-bold text-gray-900">
                    <FaUserCircle className="text-blue-400" />
                    {rest.name}
                  </div>
                  <div className="flex items-center gap-1 text-base text-blue-600 mt-1">
                    <FaMapMarkerAlt className="text-blue-400" />
                    {rest.location}
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <div className="font-semibold mb-3 text-gray-700 text-lg">Reviews:</div>
                {rest.reviews && rest.reviews.length > 0 ? (
                  <ul className="space-y-4">
                    {(rest.reviews || []).map((review, idx) => (
                      <li key={review.id} className="flex items-start bg-blue-50 rounded-xl p-4 border border-blue-100 shadow-sm relative">
                        <div className="h-10 w-10 rounded-full bg-blue-200 flex items-center justify-center text-xl font-bold text-blue-800 mr-4 mt-1 shadow">
                          {getInitials(review.reviewedByUser?.username)}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-blue-900 flex items-center gap-2">
                            {review.reviewedByUser?.username || 'Unknown'}
                          </div>
                          <div className="text-gray-700 mt-1 mb-1">{review.comment}</div>
                          {review.createdAt && (
                            <div className="text-xs text-gray-400 mt-1">{new Date(review.createdAt).toLocaleString()}</div>
                          )}
                        </div>
                        {review.reviewedByUser?.id === currentUserId && (
                          <button
                            className="ml-2 text-red-500 hover:text-red-700 p-2 rounded-full transition-colors disabled:opacity-50"
                            title="রিভিউ ডিলিট করুন"
                            onClick={() => handleDeleteReview(review.id, rest.id)}
                            disabled={deleting === review.id}
                          >
                            <FaTrash />
                          </button>
                        )}
                        {rest.reviews && idx !== rest.reviews.length - 1 && (
                          <div className="absolute left-12 right-0 bottom-0 h-px bg-blue-100 mt-2" />
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-blue-400 italic">No reviews yet</div>
                )}
              </div>
            </div>
          ))}
          {restaurants.length === 0 && !loading && !error && (
            <div className="text-blue-200 text-center text-lg">No restaurants found</div>
          )}
        </div>
      </div>
    </div>
  );
}