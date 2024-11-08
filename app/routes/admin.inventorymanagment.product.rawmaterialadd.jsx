import Layout from '../components/Layout';

export default function Component() {
  return (
    <Layout>
      <div className="bg-white dark:bg-black dark:text-white text-black p-6 bg-background rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Add Raw Material</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300" htmlFor="material-name">
              Material Name
            </label>
            <input
              type="text"
              id="material-name"
              placeholder="Enter Material Name"
              className="w-96 mt-1 block w-full border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:ring-primary focus:border-primary p-2 bg-white dark:bg-zinc-800"
            />
          </div>

          <div className="mb-4 w-96">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300" htmlFor="unit-measure">
              Unit of Measure
            </label>
            <select
              id="unit-measure"
              className="mt-1 block w-full border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:ring-primary focus:border-primary p-2 bg-white dark:bg-zinc-800"
            >
              <option>Select Unit of Measure</option>
              <option>kg</option>
              <option>g</option>
              <option>liters</option>
              <option>units</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300" htmlFor="supplier-contact">
              Supplier Contact Info
            </label>
            <input
              type="text"
              id="supplier-contact"
              placeholder="Enter Supplier Name"
              className="w-96 mt-1 block w-full border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:ring-primary focus:border-primary p-2 bg-white dark:bg-zinc-800"
            />
          </div>

          <div className="mb-4 w-96">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300" htmlFor="material-category">
              Material Category
            </label>
            <select
              id="material-category"
              className="mt-1 block w-full border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:ring-primary focus:border-primary p-2 bg-white dark:bg-zinc-800"
            >
              <option>Select Material Category</option>
              <option>Raw</option>
              <option>Processed</option>
              <option>Packaging</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300" htmlFor="supplier-name">
              Supplier Name
            </label>
            <input
              type="text"
              id="supplier-name"
              placeholder="Enter Supplier Name"
              className="w-96 mt-1 block w-full border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:ring-primary focus:border-primary p-2 bg-white dark:bg-zinc-800"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300" htmlFor="reorder-threshold">
              Reorder Threshold
            </label>
            <input
              type="number"
              id="reorder-threshold"
              placeholder="Enter Reorder Threshold"
              className="w-96 mt-1 block w-full border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:ring-primary focus:border-primary p-2 bg-white dark:bg-zinc-800"
            />
          </div>

          <div className="flex justify-end">
          

            <button
            className="bg-black mr-2 text-white dark:bg-white dark:text-black py-2 px-4 rounded-lg"
          >
            Cancel
          </button>
          <button
            className="bg-black text-white dark:bg-white dark:text-black py-2 px-4 rounded-lg"
          >
              Save
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
