import {Box} from '@twilio-paste/core/box';
import {Flex} from '@twilio-paste/core/flex';
import {Tabs, TabList, Tab, TabPanels, TabPanel} from '@twilio-paste/core/tabs';
import {Avatar} from '@twilio-paste/core/avatar';
import {Text} from '@twilio-paste/text';
import { UnorderedList, ListItem} from '@twilio-paste/core/list';

import { withTaskContext } from '@twilio/flex-ui';
import { useEffect, useState } from 'react';
const SegmentProfile = ({task}) => {

const [isLoading,setLoading] = useState(false);
const [profileData,setProfileData] = useState(null);

const [selectedTab,setSelectedTab] = useState("1");

const fetchSegmentProfile = async()=>{


if(task){
    setLoading(true);
try{

    const emailId = task?.attributes?.emailId;
    if(emailId){
        const segmentData = await fetch(`https://flex-segment-services-8626.twil.io/fetchSegmentProfile?email=${emailId}`).then(d=>d.json());
        setProfileData(segmentData?.traits);
    }

  
  setLoading(false);
}catch(e){
    console.error(e);
    setLoading(false);
}

}


}


useEffect(()=>{
fetchSegmentProfile();
},[task])



if(!task || !profileData){
    return  <Box
    padding="space60"
    width="500px"
  >
      
      </Box>
}
if(isLoading){
    return (
        <Box
        padding="space60"
        width="500px"
      >
          Loading...
          </Box>
    )
    
   ;
}


    return (
        <Box
    padding="space60"
    width="500px"
    borderLeftColor="colorBorderLight"
    borderLeftStyle="solid"
    borderLeftWidth="borderWidth10"
  >
    <Flex vertical height="100%" width="100%">
    <Flex width="100%">
      <Box
       
        padding="space40"
        width="100%"
      >
          <Flex vAlignContent="center" width="100%" >
       <Flex>
       <Avatar size="sizeIcon110" name={profileData?.name} />
    </Flex>
    <Flex grow>
    <Text as="h2" paddingLeft="space60" fontSize="fontSize80" fontWeight="fontWeightMedium" >
    {profileData.name}
    </Text>
    </Flex>
    </Flex>
      </Box>
    </Flex>
    <Flex grow  width="100%">
      <Box
       
        padding="space40"
        width="100%"
      >
            <Tabs  baseId="horizontal-tabs-example">
      <TabList aria-label="My tabs">
      <Tab>Traits</Tab>
        <Tab>Orders</Tab>
        <Tab >Support Tickets</Tab>
      </TabList>
      <TabPanels paddingTop="space20">
      <TabPanel>
      <UnorderedList>
    {
        Object.keys(profileData).map((k,kIter)=>(
                <ListItem key={`traitListItem-${kIter}`}><Text fontWeight="fontWeightBold">{k}:</Text><Text>{profileData[k]}</Text></ListItem>
        ))
    }
    
    
    
  </UnorderedList>


      </TabPanel>
        <TabPanel>TBA</TabPanel>
        <TabPanel>TBA</TabPanel>
      </TabPanels>
    </Tabs>
      </Box>
    </Flex>
  </Flex>
  </Box>
    )
}

export default withTaskContext(SegmentProfile);