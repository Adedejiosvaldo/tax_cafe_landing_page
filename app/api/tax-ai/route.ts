import { NextRequest } from "next/server";

/**
 * Proxy route to forward requests to the OS backend
 * This allows the frontend to use the same streaming format
 * while proxying through Next.js API routes
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Get backend URL from environment or use default
    const backendUrl =
      process.env.TAX_AI_BACKEND_URL || "http://localhost:7777";
    const agentId = process.env.TAX_AI_AGENT_ID || "tax-agent";

    // Construct the backend URL
    const backendApiUrl = `${backendUrl}/agents/${agentId}/runs`;

    // Forward the request to the backend
    const backendResponse = await fetch(backendApiUrl, {
      method: "POST",
      body: formData,
      headers: {
        // Don't set Content-Type for FormData, browser will set it with boundary
      },
    });

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json().catch(() => ({
        error: "Failed to connect to backend",
      }));
      return new Response(JSON.stringify(errorData), {
        status: backendResponse.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!backendResponse.body) {
      return new Response(
        JSON.stringify({ error: "No response body from backend" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Stream the response directly from backend
    return new Response(backendResponse.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (error) {
    console.error("Tax AI proxy error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to process request",
        detail: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
