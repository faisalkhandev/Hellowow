

export async function downloadImage(imageUrl: string) {
  const res = await fetch(imageUrl);

  if (!res.ok) {
    throw new Error(`Failed to fetch image: ${res.statusText}`);
  }

  // Get the image blob from the response
  const contentType = res.headers.get("content-type") || "image/jpeg";
  const contentDisposition = `attachment; filename="downloaded-image.${
    contentType.split("/")[1] || "jpg"
  }"`;

  const arrayBuffer = await res.arrayBuffer();

  return new Response(arrayBuffer, {
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": contentDisposition,
    },
  });
}
