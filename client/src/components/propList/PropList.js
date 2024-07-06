import './propList.css'
import useFetch from '../../hooks/useFetch'

export default function PropList() {
    const { data, loading, error } = useFetch("/hotels/countByType")

    const images = [
        "https://plus.unsplash.com/premium_photo-1675616563084-63d1f129623d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjV8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D",

        "https://images.unsplash.com/photo-1466098672325-c9ddda4b7975?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fEFwcGFydG1lbnR8ZW58MHx8MHx8fDA%3D",

        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fFJlc29ydHxlbnwwfHwwfHx8MA%3D%3D",

        "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fFZpbGxhc3xlbnwwfHwwfHx8MA%3D%3D",

        "https://images.unsplash.com/photo-1520277739336-7bf67edfa768?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG9zdGVsfGVufDB8fDB8fHww"
    ]
    return (
        <div className='pList'>
            {loading ? (
                "Loading"
            ) : (
                <>
                    {images && data.map((item,i)=>(
                        <div className="pListItem" key={i}>
                            <img src={images[i]} alt="" className="pListImg" />
                            <div className="pListTitle">
                                <h1>{item?.type}</h1>
                                <h3>{item.count} {item.type}</h3>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    )
}
