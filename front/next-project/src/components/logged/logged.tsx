import { useRouter } from "next/navigation";
import Link from "next/link";
//icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const Logged: React.FC = () => {
  const router = useRouter();

  const logoutHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
    localStorage.removeItem("userSession");
    router.push("/home");
  };

  return (
    <div>
      <ul className="flex space-x-6">
        <li>
          <Link className="buttonSecondary" href="/profile/dashboard">
            <AccountCircleIcon />
            Perfil
          </Link>
        </li>
        <li>
          <Link href="" className="buttonSecondary">
            logout
          </Link>
        </li>
      </ul>
    </div>
  );
};
