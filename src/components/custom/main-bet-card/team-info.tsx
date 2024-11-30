/* eslint-disable @next/next/no-img-element */
interface TeamInfoProps {
  teamImage: string;
  teamName: string;
}

export default function TeamInfo({ teamImage, teamName }: TeamInfoProps) {
  return (
    <div className="flex flex-row items-center gap-1 flex-2/3">
      <img src={teamImage} alt={teamName} className="w-8 h-8 object-contain" />
      <span className="font-medium text-sm flex-1 line-clamp-2">
        {teamName}
      </span>
    </div>
  );
}
