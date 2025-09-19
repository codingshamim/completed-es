export default function BasicInformation({
  formData,
  errors,
  handleInputChange,
}) {
  return (
    <div className="backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-xl">
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
        Product Information
      </h3>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Product Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            className={`w-full bg-transparent border ${
              errors.title ? "border-red-500" : "border-gray-600"
            } rounded-sm px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
            placeholder="Enter product title"
            required
          />
          {errors.title && (
            <p className="text-red-400 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Description *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            rows={4}
            className={`w-full bg-transparent border ${
              errors.description ? "border-red-500" : "border-gray-600"
            } rounded-sm px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none`}
            placeholder="Enter product description"
            required
          />
          {errors.description && (
            <p className="text-red-400 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Price (৳) *
            </label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => handleInputChange("price", e.target.value)}
              className={`w-full bg-transparent border ${
                errors.price ? "border-red-500" : "border-gray-600"
              } rounded-sm px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
              placeholder="0"
              required
              min="0"
              step="0.01"
            />
            {errors.price && (
              <p className="text-red-400 text-sm mt-1">{errors.price}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Discount (%)
            </label>
            <input
              type="number"
              value={formData.discount}
              onChange={(e) => handleInputChange("discount", e.target.value)}
              className={`w-full bg-transparent border ${
                errors.discount ? "border-red-500" : "border-gray-600"
              } rounded-sm px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
              placeholder="0"
              min="0"
              max="100"
            />
            {errors.discount && (
              <p className="text-red-400 text-sm mt-1">{errors.discount}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Stock *
            </label>
            <input
              type="number"
              value={formData.stock}
              onChange={(e) => handleInputChange("stock", e.target.value)}
              className={`w-full bg-transparent border ${
                errors.stock ? "border-red-500" : "border-gray-600"
              } rounded-sm px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
              placeholder="0"
              required
              min="0"
            />
            {errors.stock && (
              <p className="text-red-400 text-sm mt-1">{errors.stock}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
