import { useRouter } from "next/navigation";
import Link from "next/link";
//icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const Logged: React.FC = () => {
  const router = useRouter();

  const logoutHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
    localStorage.removeItem("loginToken");
    router.push("/");
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
          <span
            onClick={logoutHandler}
            className="buttonSecondary"
            style={{ cursor: "pointer" }}
          >
            logout
          </span>
        </li>
      </ul>
    </div>
  );
};
