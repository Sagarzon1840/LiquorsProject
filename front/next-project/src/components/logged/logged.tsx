import { useRouter } from "next/navigation"

//icons
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const Logged : React.FC = () => {
    const router = useRouter();
    
    const logoutHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
        localStorage.removeItem("userSession")
        router.push("/home")
    }

    return (
        <div>
        <ul className="flex space-x-6">
             <li>
                <a className="buttonSecondary" href="/profile/dashboard">
                    <AccountCircleIcon />
                    Perfil
                </a>
            </li>
            <li>
                <a className="buttonSecondary">logout</a>
            </li>
        </ul>
    </div>
    )
}