import useFetch from '../../hooks/useFetch'
import './featured.css'

export default function Featured() {
  const { data, loading, error } = useFetch("/hotels/countByCity?cities=berlin,Madrid")
  
  return (
    <div className='featured'>
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className="featuredItem">
            <img src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1794&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="featuredImg" />
            <div className="featuredTitles">
              <h1>Berlin</h1>
              <h4>{data[0]} Properties</h4>
            </div>
          </div>
          <div className="featuredItem">
            <img src="https://images.unsplash.com/photo-1578010908802-cd7e5cd853c9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fFRvcm9udG98ZW58MHx8MHx8fDA%3D" alt="" className="featuredImg" />
            <div className="featuredTitles">
              <h1>Madrid</h1>
              <h4>{data[1]} Properties</h4>
            </div>
          </div>
          <div className="featuredItem">
            <img src="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="featuredImg" />
            <div className="featuredTitles">
              <h1>New York, USA</h1>
              <h4>{data[2]} Properties</h4>
            </div>
          </div></>)}
    </div>
  )
}
