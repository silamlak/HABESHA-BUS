import React from "react";
import { Outlet, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
// 'https://jsonplaceholder.typicode.com/todos'
const Home = () => {
  const {data, error, isLoading} = useQuery({
    queryKey: ["todo"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/posts").then(
        (res) => res.json()
      ),
  });

  if (error) return <div>error occured</div>
  if (isLoading) return <div>loading</div>
  return (
    <>
      <div className="flex">
        {/* <div className="flex flex-col gap-4 min-w-[320px] bg-slate-100 h-screen p-4">
          <Link to={"/about/:1"}>
            <p>About</p>
          </Link>
          <Link to={"/contact/:2"}>
            <p>Contact</p>
          </Link>
        </div> */}
        <Outlet />
        {/*You'll now see the root layout again but a blank page on the right. We need to tell the root route where we want it to render its child routes. We do that with <Outlet>.  */}
      </div>

      <div>
        {data?.map((todo) => (
          <div>
            <h1>Id: {todo.id}</h1>
            <h5>Title: {todo.title}</h5>
            <p>{todo.body}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
