
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const UnLogged : React.FC = () => {
    return (
        <div>
        <ul className="flex space-x-6">
             <li>
                <a className="buttonSecondary" href="/login">Login</a>
            </li>
            <li>
                <a className="buttonPrimary" href="/register">Register</a>
            </li>
        </ul>
    </div>
    )
}