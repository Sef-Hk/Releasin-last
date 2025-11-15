// // /src/app/api/openpositions/route.ts
// import { getPayload } from "payload";
// import configPromise from "@payload-config";

// export const runtime = 'nodejs'
// export const dynamic = 'force-dynamic' // avoid caching

// export async function GET() {
//   try {
//     const payload = await getPayload({ config: await configPromise });
//     const findRes = await payload.find({
//       collection: "openpositions",
//       limit: 100,
//       pagination: false,
//     });

//     // Only get the headers
//     const positions = findRes.docs.map((p: any) => ({
//       id: p._id,        // Payload always has _id
//       header: p.header, // The position name
//     }));

//     console.log("Positions fetched:", positions);

//     return new Response(JSON.stringify(positions), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (err) {
//     console.error("Failed to fetch positions:", err);
//     return new Response(JSON.stringify({ error: "Failed to fetch positions" }), { status: 500 });
//   }
// }

// /src/app/api/openpositions/route.ts
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Mock data or fallback
const mockPositions = [
  { id: '1', header: 'Frontend Developer' },
  { id: '2', header: 'Backend Developer' },
  { id: '3', header: 'Full Stack Developer' },
];

export async function GET() {
  try {
    // Try to fetch from Payload if available
    if (process.env.PAYLOAD_SECRET) {
      const { getPayload } = await import("payload");
      const configPromise = await import("@payload-config").then(m => m.default);
      
      const payload = await getPayload({ config: await configPromise });
      const findRes = await payload.find({
        collection: "openpositions",
        limit: 100,
        pagination: false,
      });

      const positions = findRes.docs.map((p: any) => ({
        id: p._id,
        header: p.header,
      }));

      return new Response(JSON.stringify(positions), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (err) {
    console.error("Failed to fetch positions from Payload:", err);
  }

  // Fallback to mock data
  return new Response(JSON.stringify(mockPositions), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}