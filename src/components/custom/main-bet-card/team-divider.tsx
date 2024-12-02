export default function TeamDivider() {
  return (
    <div className="flex flex-row items-center gap-1 absolute top-1/2 -translate-y-[34px]">
      <span className="font-medium text-sm text-gray-200">@</span>
      <div className="w-16 h-[2px] rounded-full bg-gray-200" />
    </div>
  );
}
