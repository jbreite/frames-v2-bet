import Image from "next/image";

export default function TeamMatchup({
  teamName,
  teamImage,
}: {
  teamName: string;
  teamImage: string;
}) {
  let teamNameString = teamName;

  if (teamName.length > 16) {
    teamNameString = teamName
      .split(" ")
      .map((word) => word[0].toUpperCase())
      .join("");
  }

  return (
    <div className="flex flex-1 flex-col items-center gap-1">
      <div className="relative h-6 aspect-square">
        <img src={teamImage} alt={""} className="object-contain" />
      </div>
      <div className="flex-1 text-center font-semibold text-base">
        {teamNameString}
      </div>
    </div>
  );
}
