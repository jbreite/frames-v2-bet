export default function TeamDivider() {
  return (
    <div
      className="
        flex flex-row items-center
        absolute top-[42.5%]
      "
    >
      <span className="font-bold text-gray-200">@</span>
      <div
        className="
          flex-[0.66]
          max-w-[40%]
          h-[2px]
          rounded-full
          bg-gray-200
        "
      />
    </div>
  );
}
