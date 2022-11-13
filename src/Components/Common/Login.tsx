import "./Login.scss"

import { authWithGoogle } from "../../Lib/Auth"
import Icon from "./Icon"
import Logo from "../../Assets/logo.png"

export default function Login() {
	return (
		<div className="LoginComponent">
			<div className="form">
				<div className="logo">
					<img src={Logo} alt="" />
				</div>

				<div className="input">
					<Icon name="envelope" />
					<input type="text" placeholder="Email" />
				</div>
				<div className="input">
					<Icon name="key" />
					<input type="password" placeholder="Password" />
				</div>

				<div className="button" onClick={authWithGoogle}>
					<Icon name="sign-in bold" />
					<span>Login</span>
				</div>
			</div>
		</div>
	)
}
