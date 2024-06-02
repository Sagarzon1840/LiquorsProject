import { ITeamMember } from "@/interfaces/interfaz";

export const CardTeam: React.FC<ITeamMember> = ({ id, name, role, img }) => {
    return <div className="flex flex-col gap-2 items-center justify-center">
        <img src={img} alt={name} className="cardTeamImg" />
        <div>
            <h1 className="header3 text-center">{name}</h1>
            <p className="subtitle1 text-center">{role}</p>
        </div>
    </div>
}