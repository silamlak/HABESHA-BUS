import { useRouteError } from "react-router-dom"

const ErrorPage = () => {
    const error = useRouteError()
    console.log(error)
  return (
    <div className="flex justify-cente">
       <div>
           <h1>Oops!</h1>
          <p>Sorry, an unexpected error has occurred.</p>
          <p>
            <i>{error.statusText || error.message}</i>
          </p>
       </div>
    </div>
  )
}

export default ErrorPage
