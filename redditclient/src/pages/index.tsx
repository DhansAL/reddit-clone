import { Navbar } from "../Components/Navbar";
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from "../utils/createUrqlClient";
const Index = () => {

  return (
    <>
      <Navbar />
      <div>hello warldo</div>
    </>
  )
}

export default withUrqlClient(createUrqlClient)(Index)  
