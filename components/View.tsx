import { client } from "@/sanity/lib/client";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";
import { GetServerSideProps } from "next";
import Ping from "@/components/Ping";

// View Component
const View = ({ id, totalViews }: { id: string; totalViews: number }) => {
  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>

      <p className="view-text">
        <span className="font-black">Views: {totalViews}</span>
      </p>
    </div>
  );
};

// getServerSideProps to fetch the total views count and increment the views
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  try {
    // Fetch the current views count
    const response = await client
      .withConfig({ useCdn: false })
      .fetch(STARTUP_VIEWS_QUERY, { id });

    const currentViews = response?.[0]?.views ?? 0; // Default to 0 if views is null or undefined

    // Increment the views count
    await writeClient
      .patch(id)
      .set({ views: currentViews + 1 })
      .commit();

    // Return the updated views count as a prop
    return {
      props: {
        id,
        totalViews: currentViews + 1,
      },
    };
  } catch (err) {
    console.error("Error fetching or updating views:", err);
    return {
      notFound: true, // Return a 404 if there's an error
    };
  }
};

export default View;
