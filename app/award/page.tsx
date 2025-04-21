import ClientAward from "@/components/ClientAward";
import { Metadata } from "next";

// Metadata for the page
export const metadata: Metadata = {
  title: "لیست جوایز | اینطوریاس",
  description: "لیست جوایز موجود در فروشگاه مهرا",
};
export interface AwardData {
  id: number;
  title: string;
  link?: string;
  media_files: {
    conversion_links: {
      thumbnail_192_192: string;
    };
  }[];
}

export interface AwardsResponse {
  data: AwardData[];
  meta: {
    current_page: number;
    last_page: number;
  };
}

// Function to fetch awards data
async function fetchAwards(page: number): Promise<AwardsResponse> {
  try {
    const res = await fetch(`https://mehra.liara.run/api/v1/awards?page=${page}`, {
      next: {
        revalidate: 3 * 24 * 60 * 60, // 3 days
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch awards: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return {
      data: data.data, // assuming API response has a data field
      meta: data.meta,  // assuming API response has a meta field
    };
  } catch (error) {
    console.error("Error fetching awards:", error);
    throw error;
  }
}

// Main component for the page
export default async function AwardsPage() {
  try {
    const page = 1;
    const awardsResponse = await fetchAwards(page);

    return (
      <div>
        <ClientAward awards={awardsResponse} />
      </div>
    );
  } catch (error) {
    console.error("Error in AwardsPage:", error);
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl text-red-500">خطا در بارگذاری جوایز</h1>
        <p>{error instanceof Error ? error.message : "خطای ناشناخته"}</p>
      </div>
    );
  }
}
