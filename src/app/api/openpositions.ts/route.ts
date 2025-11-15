// /src/app/api/openpositions/route.ts
import { getPayload } from "payload";
import configPromise from "@payload-config";

export async function GET() {
  try {
    const payload = await getPayload({ config: await configPromise });
    const findRes = await payload.find({
      collection: "openpositions",
      limit: 100,
      pagination: false,
    });

    // Only get the headers
    const positions = findRes.docs.map((p: any) => ({
      id: p._id,        // Payload always has _id
      header: p.header, // The position name
    }));

    console.log("Positions fetched:", positions);

    return new Response(JSON.stringify(positions), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Failed to fetch positions:", err);
    return new Response(JSON.stringify({ error: "Failed to fetch positions" }), { status: 500 });
  }
}
