const LoginSubmitted = ({submitted}) => {
  return (
    <div className="content-grid home-hero">
        <h1>Link sent!</h1>
        <p>Check you email ({submitted}) to finish logging in.</p>
    </div>
  )
}

export default LoginSubmitted