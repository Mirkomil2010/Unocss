import { useEffect, useState } from "react";

const BASE_URL = "https://api.escuelajs.co/api/v1/products";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    image: string;
  };
  images: string[];
}

const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(BASE_URL);
  const data = await response.json();
  return data;
};

export default function HomePage() {
  const [data, setData] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts().then(setData);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans p-8">
      <div className="container mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 mb-4 animate-fade-in-down">
            Exclusive Products
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover our current collection of premium items, designed to improve your lifestyle.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {data.map((item) => (
            <div
              key={item.id}
              className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700 flex flex-col"
            >
              <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://placehold.co/400?text=No+Image';
                  }}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                  {item.category.name}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h2 className="text-xl font-bold mb-2 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2 flex-1">
                  {item.description}
                </p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${item.price}
                  </span>
                  <button className="flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-blue-600 dark:hover:bg-blue-400 transition-colors cursor-pointer">
                    <div className="i-lucide-shopping-cart text-lg" />
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
