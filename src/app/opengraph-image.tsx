import { ImageResponse } from "next/og";

export const alt = "Sports Betting Frame";
export const size = {
  width: 800,
  height: 800,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div tw="h-full w-full flex flex-col justify-center items-center relative bg-blue-500">
        <h1 tw="text-6xl text-white">Sports Betting Frame</h1>
      </div>
    ),
    {
      ...size,
    }
  );
}
