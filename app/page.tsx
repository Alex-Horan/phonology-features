'use client';
import React, { useState } from "react";
import './globals.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function FilterForm(){
  const [filterSet, setFilterSet] = useState<string[]>([]);
  const [finalData, setFinalData] = useState<string[]>([]);
  const [update, setUpdate] = useState<boolean>(false);
  let filterData: string[] = [];
  const features = [
  //positive features
  {feature: "+syll", members: ['m','n','ŋ','ɹ','l']},
  {feature: "+cons", members: ['p','b','t','d','ɾ','k','g','ʔ','tʃ','dʒ','f','v','θ','ð','s','z','ʃ','ʒ','h','m','n','ŋ','ɹ','l']},
  {feature: "+son", members: ['m','n','ŋ','ɹ','l','w','j']},
  {feature: "+cor", members: ['t','d','ɾ','tʃ','dʒ','θ','ð','s','z','ʃ','ʒ','n','ɹ','l','j']},
  {feature: "+ant", members: ['p','b','t','d','ɾ','f','v','θ','ð','s','z','m','n','ɹ','l']},
  {feature: "+cont", members: ['f','v','θ','ð','s','z','ʃ','ʒ','h','ɹ','l','w','j']},
  {feature: "+nas", members: ['m','n','ŋ']},
  {feature: "+strid", members: ['tʃ','dʒ','f','v','s','z','ʃ','ʒ']},
  {feature: "+lat", members: ['l']},
  {feature: "+d.r", members: ['tʃ','dʒ']},
  {feature: "+voice", members: ['b','d','ɾ','g','ʔ','dʒ','v','ð','z','ʒ','m','n','ŋ','ɹ','l','w','j']},
  //negative features
  {feature: "-syll", members: ['p','b','t','d','ɾ','k','g','ʔ','tʃ','dʒ','f','v','θ','ð','s','z','ʃ','ʒ','h','w','j']},
  {feature: "-cons", members: ['w','j']},
  {feature: "-son", members: ['p','b','t','d','ɾ','k','g','ʔ','tʃ','dʒ','f','v','θ','ð','s','z','ʃ','ʒ','h']},
  {feature: "-cor", members: ['p','b','k','g','ʔ','f','v','h','m','ŋ','w']},
  {feature: "-ant", members: ['k','g','ʔ','tʃ','dʒ','ʃ','ʒ','h','ŋ','w','j']},
  {feature: "-cont", members: ['p','b','t','d','ɾ','k','g','ʔ','tʃ','dʒ','m','n','ŋ']},
  {feature: "-nas", members: ['p','b','t','d','ɾ','k','g','ʔ','tʃ','dʒ','f','v','θ','ð','s','z','ʃ','ʒ','h','ɹ','l','w','j']},
  {feature: "-strid", members: ['p','b','t','d','ɾ','k','g','ʔ','θ','ð','h','m','n','ŋ','ɹ','l','w','j']},
  {feature: "-lat", members: ['p','b','t','d','ɾ','k','g','ʔ','tʃ','dʒ','f','v','θ','ð','s','z','ʃ','ʒ','h','ɹ','m','n','ŋ','w','j']},
  {feature: "-d.r", members: ['p','b','t','d','ɾ','k','g','ʔ','f','v','θ','ð','s','z','ʃ','ʒ','h','ɹ','m','n','ŋ','w','j','l']},
  {feature: "-voice", members: ['p','t','k','ʔ','tʃ','f','θ','s','ʃ','h']},
];


  function filterFeature(nSet: string[]) {
    if (nSet.length === 0) {
      for (let items in features) {
        for (let member in features[items].members) {
          if (filterData.includes(features[items].members[member])) {
            continue
          } else {
            filterData.push(features[items].members[member]);
          }
        }
      }
  } else if (nSet.length === 1) {
      for (let items in features) {
          if (features[items].feature === nSet[0]) {
              for (let member in features[items].members) {
                  if (filterData.includes(features[items].members[member])) {
                      continue
                  } else {
                      filterData.push(features[items].members[member]);
                  }
              }
          } else {
              continue
          }
      }
  } else if (nSet.length > 1) {
      for (let filter of nSet) {
          for (let items in features) {
              if (features[items].feature === filter) {
                  for (let member in features[items].members) {
                      for (let data of filterData) {
                          if (((features[items].members).includes(data)) === false){
                              let index = filterData.indexOf(data);
                              filterData.splice(index, 1);
                              continue
                          }
                      }
                      if (filterData.includes(features[items].members[member])) {
                          continue
                      } else {
                          filterData.push(features[items].members[member]);
                          features.filter(feature => {
                              for (let k=nSet.length; k>-1; k--) {
                                  if (feature.feature === nSet[k]) {
                                      for (let char of filterData) {
                                          if ((feature.members.includes(char)) && (features[(features.findIndex((item) => item.feature === nSet[nSet.length-1]))].members.includes(char))) {
                                              continue
                                          } else {
                                              let index = filterData.indexOf(char);
                                              filterData.splice(index, 1);
                                          }
                                      }
                                  }
                              }
                          });
                      }
                  }
              } else {
                  continue
          }
        }
      }
    }
  }

  const handleChange = (e: any) => {
    const { value, checked } = e.target;
    
    if (checked) {
      setFilterSet([...filterSet, value]);
    } else {
      setFilterSet(filterSet.filter((e) => e !== value));
    }
  }

  const handleFilter = (e: any) => {
    let { value } = e.target;
    setFilterSet([...filterSet, value])
    
  }

  const handleRemoveFilter = (e: any) => {
    const { value } = e.target;
    setFilterSet(filterSet.filter((e) => e !== value))
  }

  const handleSubmit = (e: any) => {
    filterFeature(filterSet);
    for (let i=0; i<filterData.length-1; i++) {
      filterData[i] = filterData[i] + ", "
    }

    setFinalData([...filterData]);



    e.preventDefault();
  }



  const listItems = features.map(feat => {
    if (!(filterSet.includes(feat.feature))) {
      return <input type="button" className="hover:bg-[#8caaee] hover:ring-2 hover:ring-blue-500 bg-catsky rounded h-16 w-32 mx-3 my-4 px-2 py-2 drop-shadow-lg" value={feat.feature} key={feat.feature} onClick={handleFilter}></input>
    }
  });

  const chips = filterSet.map(filt => {
    return <button onClick={handleRemoveFilter} value={filt} className="bg-slate-900 px-2 py-2 max-h-12 ml-2 rounded-lg mt-2 hover:bg-[#8caaee] hover:ring-2 hover:ring-blue-500" key={filt}>{filt}<FontAwesomeIcon onClick={handleRemoveFilter} className="size-3 pb-0.5 pl-1" icon={faXmark}></FontAwesomeIcon></button>
  });

  const data = finalData.map(items => {
    return <button className="ml-2 black rounded bg-white w-10 h-10">{items}</button>
  })

  return (

    <div className="bg-gradient-to-r from-mantle to-crust to-surface0 h-screen w-screen drop-shadow-md">
      <div className="absolute bottom-2 right-2 w-4 h-4 bg-white"></div>
      <div className="absolute container h-screen bg-gradient-to-r from-surface0 to-surface2 md:visible sm:visible invisible xl:max-w-96 md:max-w-64 sm:invisible drop-shadow-2xl rounded-md">
        <form onSubmit={handleSubmit} className="ml-2">
          <div className="flex flex-row md:pl-6 md:pt-5 overflow-y-auto flex-wrap max-h-90vh">
            {listItems}
          </div>
          <div className="border-b ml-0 pl-0"></div>
          <div className="fixed right-2 bottom-2">
            <button type="submit" value="Submit" className="mt-5 size-20 bg-catpink rounded text-black drop-shadow-2xl">Submit</button>
          </div>
        </form>
        
      </div>
      <div className="flex row grow-0 shrink-0 text-white text-xl z-1 absolute h-20" style={{marginLeft: '25rem'}}>
        {chips}
      </div>
        <div className="flex row wrap h-64" style={{marginLeft: '32rem', paddingTop: '24rem'}}>
            {data}
        </div>
      </div>

// <div>
    //   <div className="FilterSection">
    //     <form onSubmit={handleSubmit}>
    //       {listItems}
    //       <br></br>
    //       <button type="submit" value="Submit" className="subm mx-auto bg-gray-500 p-1 mt-3 rounded text-white border-2 border-stone-200">Submit</button>
    //     </form>
    //   </div>

    //   <div className="Output mt-10">
    //     {
    //       finalData.length > 0 
    //       ? <p className="mx-auto text-center">[{finalData}]</p>
    //       : ""
    //     }
    //   </div>
    // </div>
  )
}



export default function Home() {
 return (
  <FilterForm></FilterForm>
 )
}