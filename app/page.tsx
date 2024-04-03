'use client';
import React, { useState } from "react";

function FilterForm(){
  const [userinfo, setUserInfo] = useState<string[]>([]);

  const [finalData, setFinalData] = useState<string[]>([]);
  let filterData: string[] = [];
  
  const features = [
  //positive features
  {feature: "+syll", members: ['m','n','ŋ','ɹ','l']},
  {feature: "+cons", members: ['p','b','t','d','ɾ','k','g','ʔ','tʃ','dʒ','f','v','θ','ð','s','z','ʃ','ʒ','x','h','m','n','ŋ','ɹ','l']},
  {feature: "+son", members: ['m','n','ŋ','ɹ','l','w','j']},
  {feature: "+cor", members: ['t','d','ɾ','tʃ','dʒ','θ','ð','s','z','ʃ','ʒ','n','ɹ','l','j']},
  {feature: "+ant", members: ['p','b','t','d','ɾ','f','v','θ','ð','s','z','m','n','ɹ','l']},
  {feature: "+cont", members: ['f','v','θ','ð','s','z','ʃ','ʒ','x','h','ɹ','l','w','j']},
  {feature: "+nas", members: ['m','n','ŋ']},
  {feature: "+strid", members: ['tʃ','dʒ','f','v','s','z','ʃ','ʒ']},
  {feature: "+lat", members: ['l']},
  {feature: "+d.r", members: ['tʃ','dʒ']},
  {feature: "+voice", members: ['b','d','ɾ','g','ʔ','dʒ','v','ð','z','ʒ','m','n','ŋ','ɹ','l','w','j']},
  //negative features
  {feature: "-syll", members: ['p','b','t','d','ɾ','k','g','ʔ','tʃ','dʒ','f','v','θ','ð','s','z','ʃ','ʒ','x','h','w','j']},
  {feature: "-cons", members: ['w','j']},
  {feature: "-son", members: ['p','b','t','d','ɾ','k','g','ʔ','tʃ','dʒ','f','v','θ','ð','s','z','ʃ','ʒ','x','h']},
  {feature: "-cor", members: ['p','b','k','g','ʔ','f','v','x','h','m','ŋ','w']},
  {feature: "-ant", members: ['k','g','ʔ','tʃ','dʒ','ʃ','ʒ','x','h','ŋ','w','j']},
  {feature: "-cont", members: ['p','b','t','d','ɾ','k','g','ʔ','tʃ','dʒ','m','n','ŋ']},
  {feature: "-nas", members: ['p','b','t','d','ɾ','k','g','ʔ','tʃ','dʒ','f','v','θ','ð','s','z','ʃ','ʒ','x','h','ɹ','l','w','j']},
  {feature: "-strid", members: ['p','b','t','d','ɾ','k','g','ʔ','θ','ð','x','h','m','n','ŋ','ɹ','l','w','j']},
  {feature: "-lat", members: ['p','b','t','d','ɾ','k','g','ʔ','tʃ','dʒ','f','v','θ','ð','s','z','ʃ','ʒ','x','h','ɹ','m','n','ŋ','w','j']},
  {feature: "-d.r", members: ['p','b','t','d','ɾ','k','g','ʔ','f','v','θ','ð','s','z','ʃ','ʒ','x','h','ɹ','m','n','ŋ','w','j','l']},
  {feature: "-voice", members: ['p','t','k','ʔ','tʃ','f','θ','s','ʃ','x','h']}

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
      setUserInfo([...userinfo, value]);
    } else {
      setUserInfo(userinfo.filter((e) => e !== value));
    }
  }

  const handleSubmit = (e: any) => {
    filterFeature(userinfo);
    for (let i=0; i<filterData.length-1; i++) {
      filterData[i] = filterData[i] + ", "
    }

    setFinalData([...filterData]);
    e.preventDefault()
  }

  const listItems = features.map(feat => {
    return <label className="selection" key={feat.members[0]}>{feat.feature}<input type="checkbox" className="selectionF" value={feat.feature} key={feat.feature} onChange={handleChange}></input></label>
  });

  return (
    <div>
      <div className="FilterSection">
        <form onSubmit={handleSubmit}>
          {listItems}
          <br></br>
          <button type="submit" value="Submit" className="subm mx-auto bg-gray-500 p-1 mt-3 rounded text-white border-2 border-stone-200">Submit</button>
        </form>
      </div>

      <div className="Output mt-10">
        {
          finalData.length > 0 
          ? <p className="mx-auto text-center">[{finalData}]</p>
          : ""
        }
      </div>
    </div>
  )
}



export default function Home() {
 return (
  <FilterForm></FilterForm>
 )
}