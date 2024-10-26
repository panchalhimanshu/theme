import Layout from '~/components/Layout';

export default function Settings() {
  return (
    <Layout>
      <div className="mx-auto p-6 bg-card rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Employee Info</h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-muted-foreground" htmlFor="first-name">
            First Name
          </label>
          <input className="mt-1 block w-full border border-border rounded-md p-2" type="text" id="first-name" placeholder="Enter First Name" />
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-foreground" htmlFor="last-name">
            Last Name
          </label>
          <input className="mt-1 block w-full border border-border rounded-md p-2" type="text" id="last-name" placeholder="Enter Last Name" />
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-foreground" htmlFor="role">
            Role
          </label>
          <input className="mt-1 block w-full border border-border rounded-md p-2" type="text" id="role" placeholder="Enter Role" />
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-foreground" htmlFor="email">
            Email Id
          </label>
          <input className="mt-1 block w-full border border-border rounded-md p-2" type="email" id="email" placeholder="Enter Email Id" />
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-foreground" htmlFor="mobile">
            Mobile No.
          </label>
          <input className="mt-1 block w-full border border-border rounded-md p-2" type="tel" id="mobile" placeholder="Enter Mobile No" />
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-foreground" htmlFor="user-id">
            User Id
          </label>
          <input className="mt-1 block w-full border border-border rounded-md p-2" type="text" id="user-id" placeholder="Enter User Id" />
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-foreground" htmlFor="password">
            Password
          </label>
          <input className="mt-1 block w-full border border-border rounded-md p-2" type="password" id="password" placeholder="Enter your password" />
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-foreground" htmlFor="confirm-password">
            Confirm Password
          </label>
          <input className="mt-1 block w-full border border-border rounded-md p-2" type="password" id="confirm-password" placeholder="Enter your password" />
        </div>
      </form>
      <button className="mt-6 bg-secondary text-secondary-foreground hover:bg-secondary/80 py-2 px-4 rounded-lg">Save</button>
    </div>
    </Layout>
  );
}
