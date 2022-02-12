import { Navbar } from "../Components/Navbar";
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import { Layout } from "../Components/Layout";
const Index = () => {
  const [{ data }] = usePostsQuery();
  return (
    <>
      <Layout>

        <div>hello warldo</div>
        {!data ? <div>loading..</div> : data.posts.map((p) => <div key={p.id}> {p.title}</div>)}
      </Layout>
    </>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)  
