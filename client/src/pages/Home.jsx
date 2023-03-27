import React, { useState, useEffect } from 'react';
import { Loader, Card, FormField } from '../components';
import axios from 'axios'

// const RenderCards = (props) => {
//     // const [myData,setMyData] = useState([])
//     // console.log("jh")
//     // useEffect(()=>{
//     //     setMyData(props.data);

//     // },[myData])
//     if (props.data?.length > 0) {
//         props.data.map((post) => <Card key={post._id} {...post} />)
//        // console.log("hsdf")
//     }
//     return (
//         <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{props.title}</h2>
//     );
// };

const Home = () => {
    const [loading, setLoading] = useState(false)
    const [allPosts, setAllPosts] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchedResults, setSearchedResults] = useState(null);

    const url ='http://localhost:9090/api/v1/post';
    
    useEffect(() => {
        const fetchPosts = async() => {
            setLoading(true);
            try {
                await axios.get(url).then((res)=>{
                    setAllPosts(res.data.data)
                })
            } catch (error) {
                alert(error)
            } finally {
                setLoading(false)
            }
        }
        fetchPosts()
    }, [searchText,url]);


    const handleSearchChange = (e) => {
        e.preventDefault();
        clearTimeout(searchTimeout)
        setSearchText(e.target.value);
        setSearchTimeout(
            setTimeout(() => {
                const searchResults = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
                setSearchedResults(searchResults)
            }, 500)
        );
    };


    return (
        <section className="max-w-7xl mx-auto">
            <div>
                <h1 className="font-extrabold text-[#222328] text-[32px]">The Community ShowCase</h1>
                <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">Browse through  collection of imaginative and visually stunning images generated by Uktarsh</p>
            </div>
            <div className="mt-16">
                <FormField
                    labelName="Search posts"
                    type="text"
                    name="text"
                    placeholder="search posts"
                    value={searchText}
                    handleChange={handleSearchChange}
                />
            </div>
            <div className="mt-10">
                {loading ? (
                    <div className="flex justify-center items-center">
                        <Loader />
                    </div>
                ) : (
                    <>
                        {searchText && (
                            <h2 className="font-medium text-[#666e75] text-xl mb-3">
                                Showing result for <span className="text-[#222328]">{searchText}</span>
                            </h2>
                        )}

                        <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
                            {searchText && searchText ? (

                                (allPosts.map((post)=>{<Card post={post}/>}))

                            ) : 
                            // (
                            //     <RenderCards
                            //         data={[allPosts]}
                            //         title=" no posts found" />
                            // )
                               (allPosts.map((post) => <Card post={post}/>))
                            }
                        </div>  
                    </>
                )}
            </div>
        </section>
    )
}

// const Home = ()=>{
//     console.log("hELLO");
//     return(
//         <div>Hello</div>
//     )
// }

export default Home;
