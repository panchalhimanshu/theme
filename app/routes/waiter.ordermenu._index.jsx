import { useState } from 'react'
import { Search } from 'lucide-react'
import Layout from '../components/Layout'

export default function Component() {
  const [activeCategory, setActiveCategory] = useState('Best Seller')

  const menuItems = [
    {
      id: "1",
      name: "Crispy Dory Sambal Matah",
      price: 500.50,
      rating: 4.5,
      image: "/placeholder.svg",
      category: "Best Seller"
    },
    {
      id: "2",
      name: "Margherita Pizza",
      price: 450.00,
      rating: 4.2,
      image: "/placeholder.svg",
      category: "Pizza"
    },
    {
      id: "3",
      name: "Classic Cheeseburger",
      price: 350.00,
      rating: 4.0,
      image: "/placeholder.svg",
      category: "Burger"
    },
    {
      id: "4",
      name: "Iced Latte",
      price: 200.00,
      rating: 4.3,
      image: "/placeholder.svg",
      category: "Beverage"
    },
    {
      id: "5",
      name: "Garlic Bread",
      price: 150.00,
      rating: 3.8,
      image: "/placeholder.svg",
      category: "Appetizer"
    }
  ]

  const categories = [
    "Appetizer",
    "Best Seller",
    "Pizza",
    "Burger",
    "Beverage"
  ]

  const filteredItems = menuItems.filter(item => item.category === activeCategory)

  return (
    <Layout>
      <div className="mx-auto p-4 space-y-6 bg-white dark:bg-black text-black dark:text-white">
        {/* Categories */}
        <div className="flex overflow-x-auto gap-2 pb-2 no-scrollbar">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                category === activeCategory
                  ? "dark:bg-white bg-black dark:text-black text-white"
                  : "bg-background hover:bg-secondary"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search and Title */}
        <div className="space-y-4">
          <h1 className="text-xl font-semibold">{activeCategory}</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Type Code, Letter Food"
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 bg-background rounded-lg border"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-8 w-8"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(item.rating)
                            ? "text-white fill-black"
                            : "text-muted-foreground"
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                    <span className="text-sm text-muted-foreground">{item.rating}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-medium">₹{item.price.toFixed(2)}</span>
                <button className="px-3 py-1 text-sm bg-black text-white rounded-md hover:bg-black/90">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
