import "./Login.scss"

import { authenticate } from "../../Lib/Auth"
import Icon from "./Icon"
import Logo from "../../Assets/logo.png"
import { useState } from "react"

export default function Login() {
	const [email, setEmail] = useState<string>("")
	const [password, setPassword] = useState<string>("")

	return (
		<div className="LoginComponent">
			<div className="form">
				<div className="logo">
					<img src={Logo} alt="" />
				</div>

				<div className="input">
					<Icon name="envelope" />
					<input
						type="text"
						placeholder="Email"
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="input">
					<Icon name="key" />
					<input
						type="password"
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>

				<div
					className="button"
					onClick={() => {
						authenticate(email, password)
					}}
				>
					<Icon name="sign-in bold" />
					<span>Login</span>
				</div>
			</div>
		</div>
	)
}
