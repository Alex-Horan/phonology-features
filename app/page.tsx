'use client';
import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faFilter } from "@fortawesome/free-solid-svg-icons";
import { Divider } from "@mui/material";
import './globals.css';

function FilterForm(){
  const [filterSet, setFilterSet] = useState<string[]>([]);
  const [finalData, setFinalData] = useState<string[]>([]);
  let filterData: string[] = [];
  const modRef = useRef<HTMLDivElement>(null);

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
    {feature: "+voice", members: ['b','d','ɾ','g','ʔ','dʒ','v','ð','z','ʒ','m','n','ŋ','ɹ','l','w','j','e','i','u','o','a','ɑ','æ','ə','ɛ','ɪ','ɔ','ʊ','ʌ','y']},
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
  //positive vowel features
    {feature: "+high", members:['i','y','u','ɪ','ʊ']},
    {feature: "+low", members:['æ','ɑ','a']},
    {feature: "+front", members:['e','i','a','æ','ɛ','ɪ','y']},
    {feature: "+back", members:['u','ɑ','ɔ','ʊ','ʌ','o']},
    {feature: "+round", members:['u','ɔ','ʊ','o','y']},
    {feature: "+tense", members: ['e','i','u','a','ɑ','o']},
  // negative vowel features
    {feature: "-high", members:['e','a','ɑ','æ','ə','ɛ','ɔ','ʌ','o']},
    {feature: "-low", members:['e','i','u','ə','ɛ','ɪ','ɔ','ʊ','ʌ','o']},
    {feature: "-back", members:['e','i','a','æ','ə','ɛ','ɪ']},
    {feature: "-front", members:['u','ɑ','ə','ɔ','ʊ','ʌ','o']},
    {feature: "-round", members:['e','i','a','ɑ','æ','ə','ɛ','ɪ','ʌ']},
    {feature: "-tense", members:['æ','ə','ɛ','ɪ','ɔ','ʊ','ʌ']},
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
  //animates when you click/select a filter: BOTH
  const handleFilter = (e: any) => {
    let { value } = e.target;
    e.target.className = e.target.className + " fadeOutE";
    e.target.addEventListener('animationend', () => {
      e.target.className = e.target.className + " opacity-0";
      setFilterSet([...filterSet, value]);
    });
  }

  //animates removing the chip/filters: BOTH
  const handleRemoveFilter = (e: any) => {
    const { value } = e.target;
    e.target.className = e.target.className.replace("fadeInE","") + " fadeOutE";
    e.target.addEventListener('animationend', () => {
      e.target.className = e.target.className + " opacity-0";
      setFilterSet(filterSet.filter((e) => e !== value));
    });
  }

  const handleSubmit = (e: any) => {
    filterFeature(filterSet);
    setFinalData([...filterData]);
    e.preventDefault();
  }

  //animates the opening of the filter panel: MOBILE
  const openFilter = () =>{
    if (modRef.current!.classList.contains("filterCloseE")) {
      modRef.current!.className.replace(" filterCloseE","filterOpenE");
    } else {
      modRef.current!.className = modRef.current!.className + " filterOpenE";
    }
    
  }

  //animates the closing of the filter panel: MOBILE
  const closeFilter = () => {
    modRef.current!.className = modRef.current!.className.replace("filterOpenE","filterCloseE")
    modRef.current?.addEventListener('animationend', () => {
      modRef.current!.className = modRef.current!.className.replace("filterCloseE","");
    })
  }

  //same as handleSubmit(), but this closes the filter panel after: MOBILE
  const handleMobileSubmit = (e: any) => {
    filterFeature(filterSet);
    setFinalData([...filterData]);
    e.preventDefault();
    closeFilter();
  }

  //returns all the elements that start with '+', this is so i can add a divider between the positive and negative features: BOTH
  const plusListItems = features.map(feat => {
    if (!(filterSet.includes(feat.feature))) {
      if (feat.feature.charAt(0) === "+") {
        return <input type="button" className="hover:bg-[#8caaee] hover:ring-2 hover:ring-blue-500 bg-catsky rounded h-16 w-32 mx-3 my-4 px-2 py-2 drop-shadow-lg" value={feat.feature} key={feat.feature} onClick={handleFilter}></input>
      }
    }
  });
  //returns all elements that start with '-': BOTH
  const minusListItems = features.map(feat => {
    if (!(filterSet.includes(feat.feature))) {
      if (feat.feature.charAt(0) === '-') {
        return <input type="button" className="hover:bg-[#8caaee] hover:ring-2 hover:ring-blue-500 bg-catsky rounded h-16 w-32 mx-3 my-4 px-2 py-2 drop-shadow-lg" value={feat.feature} key={feat.feature} onClick={handleFilter}></input>
      }
    }
  });

  //this visualizes the selected filters and allows you to remove them on click: BOTH
  const chips = filterSet.map(filt => {
    return <button key={filt} onClick={handleRemoveFilter} value={filt} className="chip fadeInE bg-catsapphire px-2 py-2 max-h-12 ml-2 rounded-lg mt-2 hover:bg-[#8caaee] hover:ring-2 hover:ring-blue-500">{filt}</button>
    
  });

  // this outputs each ipa character in its own little box: BOTH
  const data = finalData.map(items => {
    return <div key={items} className="ml-2 w-10 text-center black rounded bg-white p-2">{items}</div>
  })

  return (
    // i should rewrite this at some point, i have figured out how innefficient this styling is. i am quite literally fighting against myself; will continue to improve.
    <div className="bg-gradient-to-r from-mantle to-crust to-surface0 h-svh md:h-screen w-screen relative z-0 overflow-y-hidden">
      {/* filter menu: MOBILE */}
      <div ref={modRef} className="absolute md:hidden h-0 bottom-0 bg-white w-screen overflow-y-scroll z-10" style={{borderRadius: '20px 20px 0 0'}}>
          <div className="sticky float-right top-1 right-2 h-4 pr-2 pt-2" onClick={closeFilter}>&#10006;</div>
          <div className="flex flex-row flex-wrap flex-grow-0 justify-center flex-shrink-0 overflow-y-scroll mt-4">
            {plusListItems}
          <div className="h-0.5 bg-black w-full"></div>
            {minusListItems}
          </div>
          <button type="submit" value="Submit" className="sticky bottom-2 float-right right-2 bg-catpink rounded-full w-12 h-12" onClick={handleMobileSubmit}><FontAwesomeIcon icon={faCheck}></FontAwesomeIcon></button>
      </div>

      {/* button to open filter menu: MOBILE  */}
      <button className="absolute w-10 h-10 bottom-2 left-2 bg-catsky z-11 md:hidden block rounded-full" onClick={openFilter}><FontAwesomeIcon icon={faFilter}></FontAwesomeIcon></button>

      {/* filter panel/sidebar: DESKTOP */}
      <div className="absolute container h-screen hidden md:block bg-gradient-to-r from-surface0 to-surface2 xl:max-w-96 md:max-w-48 drop-shadow-2xl rounded-md">
      <form onSubmit={handleSubmit}>
          <div className="flex flex-row md:pt-5 overflow-y-auto flex-wrap max-h-90vh">
            {/* i sure do love <div>s */}
            <div>
            <div className='md:pl-6'>
              {plusListItems}
            </div>
            <Divider variant="fullWidth" className="static w-full"></Divider>  
            <div className="md:pl-6">
              {minusListItems}
            </div>
            </div>
          </div>
          <Divider variant="fullWidth"></Divider>
          <div className="flex flex-row-reverse mt-3 mr-3">
            {/* button to submit selected filters: DESKTOP */}
            <button type="submit" value="submit" className="bg-catpink rounded-xl drop-shadow-2xl w-16 h-16"><FontAwesomeIcon className="text-2xl text-center" icon={faCheck}></FontAwesomeIcon></button>
          </div>
        </form> 
      </div>
      {/* displays selected filters: ALL */}
      <div className="flex flex-row flex-wrap grow-0 shrink-0 md:text-white md:text-xl md:z-1 md:absolute md:h-20 md:ml-25r">
        {chips}
      </div>
      {/* displays the data based on submitted filters: BOTH */}
        <div className="flex flex-row flex-wrap items-center grow-0 shrink-0 h-screen max-w-96 m-auto">
            <div className="m-auto h-screen flex place-content-center flex-row gap-y-2.5 flex-wrap">
              {data}
            </div>
        </div>  
        </div>

      
  )
}



export default function Home() {
  return (
    <FilterForm ></FilterForm>
  )
}