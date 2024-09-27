import '../styles.css'
import { Button, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { loginFormValidation } from '../utils/validation'
import { loginUser } from '../reducers/user'
import { useDispatch } from 'react-redux'
import { useState } from 'react'

const LoginForm = () => {
    const [errors, setErrors] = useState({})
    const [username, setUsername] = useState('testuser')
    const [password, setPassword] = useState('password123')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleSubmit = async (event) => {
        event.preventDefault()
        const errors = loginFormValidation({ username, password })
        setErrors(errors)
        if (Object.keys(errors).length === 0) {
            try {
                const result = await dispatch(loginUser({ username, password }))
                if (result.success) {
                    navigate('/')
                }
            } catch (e) {
                console.log(e)
            }
        }
    }
    return (
        <div className="auth-container">
            <Form className="auth-form" onSubmit={handleSubmit}>
                <h3 className="fw-bold mb-3 text-center">Welcome back!</h3>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        isInvalid={!!errors.username}
                        onChange={({ target }) => setUsername(target.value)}
                        placeholder="Please enter your username"
                        type="username"
                        value={username}
                    />
                    <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        isInvalid={!!errors.password}
                        onChange={({ target }) => setPassword(target.value)}
                        placeholder="Please enter your password"
                        type="password"
                        value={password}
                    />
                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                </Form.Group>
                <Button className="mb-3 mt-3 w-100" type="submit" variant="primary">
                    Log in
                </Button>
                <div className="text-center mt-3">
                    <p>
                        Don&apos;t have an account? <Link to="/signup">Sign up</Link>
                    </p>
                </div>
            </Form>
        </div>
    )
}

export default LoginForm
