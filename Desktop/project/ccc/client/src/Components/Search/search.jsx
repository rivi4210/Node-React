import  {MdSearch}  from "react-icons/md"
import { useSearchParams } from "react-router-dom"
const Search = ({placeholders}) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const q=searchParams.get("q")
    return (
    <div >
<MdSearch/>
<input type='text'
class name='search-input'
defaultValue={q||""}
placeholder={placeholders}
onChange={(e)=>setSearchParams({q:e.target.value})}/>
    </div>)
}
export default Search