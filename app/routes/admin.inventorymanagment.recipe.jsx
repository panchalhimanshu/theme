import Layout from '../components/Layout';

export default function Component() {
  return (
    <Layout>
      <div className="bg-white dark:bg-black dark:text-white p-6 bg-background rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 pb-2 gap-24 text-sm">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="">Item Name:</span>
              <span>Grilled Sandwich</span>
            </div>
            <div className="flex justify-between">
              <span className="">Created By:</span>
              <span>Admin</span>
            </div>
            <div className="flex justify-between">
              <span className="">Date:</span>
              <span>25/01/2024</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="">Sc Type Name:</span>
              <span>Food Preparation</span>
            </div>
            <div className="flex justify-between">
              <span className="">Us Name:</span>
              <span>Kitchen</span>
            </div>
            <div className="flex justify-between">
              <span className="">Remarks:</span>
              <span>Standard Grilled Sandwich</span>
            </div>
          </div>

          <div className="">
          <div className="bg-card bg-gray-200 px-2 pb-2 rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-2">Full Forms</h2>
          <ul className="list-disc pl-5">
            <li className="text-muted-foreground">Uom - Unit of Measurement</li>
            <li className="text-muted-foreground">Bom - Bill of materials</li>
            <li className="text-muted-foreground">UoName - Unit of operation name</li>
          </ul>
        </div>
          </div>
        </div>

        {/* Recipe Items Section */}
        <div className=" rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 ">Recipe Items</h3>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="border dark:border-white border-black">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Sr No.</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Product Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Product Type</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Unit of Measurement</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Quantity</th>
                  </tr>
                </thead>
                <tbody className=" divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm ">40001</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm ">Bread Slices</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm ">Raw Material</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm ">Number</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm ">2</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm ">40001</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm ">Cheese Slices</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm ">Raw Material</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm ">Number</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm ">1</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm ">40001</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm ">Tomatoes</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm ">Raw Material</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm ">Number</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm ">1</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Customization Details Section */}
        <div className=" rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 ">Customization Details</h3>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="border dark:border-white border-black">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Sr No.</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Customization Option</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Product Affected</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Unit of Measurement</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Updated Quantity</th>
                  </tr>
                </thead>
                <tbody className=" divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm ">40001</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm ">Extra Cheese</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm ">Cheese Slices</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm ">Number</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm ">2</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm ">40001</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm ">No Tomatoes</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm ">Tomatoes</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm ">Number</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm ">0</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm ">40001</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm ">Extra Cheese</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm ">Cheese Burst</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm ">Slices</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm ">1</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Recipe Description Section */}
        <div className=" rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 ">Recipe Description</h3>
          </div>
          <div className="px-4 py-5 sm:p-6 space-y-2 text-sm">
            <p>• Heat Extra Butter in a pan over medium heat</p>
            <p>• Lorem ipsum dolor sit amet consectetur. Augue venenatis ut tempus vel eros.</p>
            <p>• Lorem ipsum dolor sit amet consectetur. Augue venenatis ut tempus vel eros.</p>
          </div>
        </div>

        {/* Semi-Finished Goods Section */}
        <div className=" rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 ">Semi - Finished Goods</h3>
          </div>
          <div className="px-4 py-5 sm:p-6 space-y-2 text-sm">
            <p>Includes: Raw Tomatoes & Lettuce leaves</p>
            <p>Use Name: Prepared set</p>
            <p>Quantity: 1 Set</p>
          </div>
        </div>

        <div className="flex justify-end">
          <button 
            // onClick={handleGoBack}
            className=" dark:text-white font-semibold text-black px-4 py-2 rounded-full shadow-md border border-black dark:border-white">
            Go Back
          </button>
        </div>
      </div>
    </Layout>
  );
}
