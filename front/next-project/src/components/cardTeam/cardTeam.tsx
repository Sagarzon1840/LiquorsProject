import { ITeamMember } from "@/interfaces/interfaz";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Link from "next/link";

export const CardTeam: React.FC<ITeamMember> = ({ id, name, role, img, GitHub, LinkedIn }) => {
  return (
    <div className="flex flex-col bg-white border-t-8 border-2 rounded-t-xl rounded-lg border-solid border-wine gap-2 items-center justify-center p-4 w-48 h-64">
      <img src={img} alt={name} className="cardTeamImg" />
      <div>
        <h1 className="text-black text-center">{name}</h1>
        <p className="text-black text-center">{role}</p>
        <div className="flex flex-row item-center justify-center gap-2">
          <Link href={`${GitHub}`} className="text-black">
            <GitHubIcon className="text-black" />
          </Link>
          <Link href={`${LinkedIn}`} className="text-black">
            <LinkedInIcon className="text-black" />
          </Link>
        </div>
      </div>
    </div>
  );
};
