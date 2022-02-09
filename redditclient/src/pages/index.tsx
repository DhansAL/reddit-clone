import { Navbar } from "../Components/Navbar";
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
const Index = () => {
  const [{ data }] = usePostsQuery();
  return (
    <>
      <Navbar />
      <div>hello warldo</div>
      {!data ? <div>loading..</div> : data.posts.map((p) => <div key={p.id}> {p.title}</div>)}
    </>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)  
