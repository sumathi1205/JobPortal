import Banner from "../components/Banner"
import {useEffect, useState} from 'react';
import Card from "../components/Card";
import Jobs from "./Jobs";
import Sidebar from "../sidebar/Sidebar";
import Newsletter from "../components/Newsletter";
const Home = () => {
  const [selectedCategory, setSelectedCategory] =useState(null) ;
  const [jobs,setJobs] = useState([]);
  const [isLoading , setIsLoading] =useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerpage =6;


useEffect(() => {
  setIsLoading(true);
  fetch("http://localhost:3000/all-jobs")
    .then((res) => res.json())
    .then((data) => {
      // console.log(data)
      setJobs(data);
      setIsLoading(false);
    });
}, [])

console.log(jobs)
  const [query,setQuery] = useState("");
    const handleInputChange = (event) =>{
        setQuery(event.target.value)
    }
    const filteredItems = jobs.filter((job) => job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    //console.log(filteredItems)
    
    const handleChange = (event) => {
      setSelectedCategory(event.target.value)
    }
    
    const handleClick = (event) => {
      setSelectedCategory(event.target.value)
    }

    const calculatePageRange = () => {
      const startIndex = (currentPage - 1) * itemsPerpage;
      const endIndex = startIndex + itemsPerpage;
      return {startIndex,endIndex};
    }


    const nextPage = () => {
      if(currentPage < Math.ceil(filteredItems.length / itemsPerpage)){
        setCurrentPage(currentPage + 1);
      }
    }


    const prevPage = () => {
      if(currentPage > 1){
        setCurrentPage(currentPage - 1)
      }
    }
     

     const filteredData = (jobs,selected , query) => {
      let filteredJobs = jobs;

      if(query){
        filteredJobs = filteredItems;
      }

      if(selected){
        filteredJobs=filteredJobs.filter(
          ({jobLocation,maxPrice,experienceLevel,salaryType,employmentType,postingDate
          })=> 
          jobLocation.toLowerCase() === selected.toLowerCase() || 
          parseInt(maxPrice) <= parseInt(selected) ||
          postingDate >= selected || 
          experienceLevel.toLowerCase() === selected.toLowerCase() ||
           salaryType.toLowerCase() === selected.toLowerCase() ||
           employmentType.toLowerCase() === selected.toLowerCase() 
        );
        console.log(filteredJobs);
      }

      const {startIndex,endIndex} = calculatePageRange();
       filteredJobs =  filteredJobs.slice(startIndex,endIndex)
      return filteredJobs.map((data,i) => <Card key={i} data={data}/>)

     }

     const result = filteredData(jobs,selectedCategory,query);

  return (
    <div style={{ backgroundImage: `url(https://media.istockphoto.com/id/1138395421/photo/blue-abstract-background-or-texture.webp?b=1&s=170667a&w=0&k=20&c=3WdlXWR1b6QQpLsNxCthtD6KB2plxys2PNYjreLObSs=)`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
      <Banner query={query} handleInputChange={handleInputChange}/>
    
      <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
        <div className="bg-white p-4 rounded">
          <Sidebar handleChange={handleChange}  handleClick={handleClick}/>
        </div>
        <div className="col-span-2 bg-white p-4 rounded-sm"> 
        {
          isLoading ? (<p className="font-medium">Loading....</p>) : result.length > 0 ? (<Jobs result={result}/>): <>
          <h3 className="text-lg font-bold mb-2">{result.length} Jobs</h3>
          <p>No data found</p>
          </>
        } 

           {
             result.length > 0 ? (
              <div className="flex justify-center mt-4 space-x-8">
                <button onClick={prevPage}  disabled = {currentPage === 1} 
                className="hover:underline">Previous</button>
                <span className="mx-2">Page {currentPage}  of  {Math.ceil(filteredItems.length / itemsPerpage)}</span>
                <button onClick={nextPage}  disabled= {currentPage === Math.ceil(filteredItems.length / itemsPerpage
                > itemsPerpage )} className="hover:underline">Next</button>
                </div>
             ) : ""
           }
        

            </div>
        <div className="bg-white p-4 rounded"><Newsletter/></div>
      </div>

    </div>
  )
}

export default Home