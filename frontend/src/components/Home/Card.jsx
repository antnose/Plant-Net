import { Link } from "react-router";
import { motion } from "framer-motion";

const Card = ({ plant }) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="col-span-1 cursor-pointer group"
    >
      <Link
        to={`/plant/${plant._id}`}
        className="block bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20 overflow-hidden"
      >
        <div className="flex flex-col h-full">
          {/* Image Container */}
          <div className="relative overflow-hidden aspect-square bg-gradient-to-br from-emerald-50 to-teal-50">
            <motion.img
              className="object-cover h-full w-full group-hover:scale-110 transition-transform duration-500"
              src={plant?.image}
              alt="Plant Image"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5 }}
            />

            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className="bg-white/90 backdrop-blur-sm text-emerald-700 px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg border border-white/20">
                {plant?.category}
              </span>
            </div>

            {/* Price Badge */}
            <div className="absolute top-4 right-4">
              <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
                ${plant?.price}
              </span>
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ opacity: 1, scale: 1 }}
                className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-2xl"
              >
                <svg
                  className="w-6 h-6 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </motion.div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex-1 flex flex-col">
            {/* Plant Name */}
            <h3 className="font-bold text-xl text-gray-800 mb-3 line-clamp-1 group-hover:text-emerald-600 transition-colors">
              {plant?.name}
            </h3>

            {/* Details Grid */}
            <div className="space-y-3 mt-auto">
              {/* Category */}
              <div className="flex items-center gap-2 text-gray-600">
                <svg
                  className="w-4 h-4 text-emerald-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                <span className="text-sm font-medium">{plant?.category}</span>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-2 text-gray-600">
                <svg
                  className="w-4 h-4 text-emerald-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
                <span className="text-sm font-medium">
                  {plant?.quantity} in stock
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-2 text-gray-600">
                <svg
                  className="w-4 h-4 text-emerald-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
                <span className="text-sm font-medium">
                  ${plant?.price} per unit
                </span>
              </div>
            </div>

            {/* View Details Button */}
            <motion.div
              whileHover={{ x: 4 }}
              className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100"
            >
              <span className="text-emerald-600 text-sm font-semibold">
                View Details
              </span>
              <svg
                className="w-4 h-4 text-emerald-600 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default Card;
