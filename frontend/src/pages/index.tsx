import {Text, Button, VStack, Center, ListItem, Box, Container, keyframes} from "@chakra-ui/react"
import Picture from "../components/Picture"
import { useEffect, useState } from "react";
import NewPictureModal from "../components/NewPictureModal";
import axios from "axios";
import ReactDOM from 'react-dom';
import document from '@angular/common';
import "@angular/compiler";

export default function Home() {
  const [newPostDialog, setNewPostDialog] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/pictures")
        .then(function (response) {
          console.log(response.data)
          const newPics = response.data;
          return (
            <ul>
              {newPics.map((newPic: any) =>
                <ListItem key={newPic._id}/>
              )}
            </ul>
          )
        })
        .catch(function (error) {
          console.log(error);
        });
  }, []);

  // @ts-ignore
  //const root = ReactDOM.unstable_createRoot(global.document.getElementById('root'))
  //root.render(updatePictures);//<Picture image_address={updatePictures().image_address} alt_text={updatePictures().alt_text}/>);

  return (
    <div id='root'>
      <NewPictureModal
        isOpen={newPostDialog}
        onClose={() => setNewPostDialog(false)} />

      <Text textAlign='center' my={20} fontSize="62" fontWeight={'extrabold'} fontFamily={'Rubik'}>
        Your Image Gallery
      </Text>
      <Center>
        <Button mb={20} alignItems='center' textAlign='center' border='1px' borderColor='blue.500' _hover={{ bg: 'blue.500' }}
          fontFamily='FA Solid 900' _focus={{boxShadow: 'outline'}} onClick={() => setNewPostDialog(true)}>
          Add Image
        </Button>
      </Center>

      <VStack alignItems='center' spacing='24px' pt={18} pb={16} mb={8}>
        <Picture image_address='https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg'
          alt_text="Cat" />
        <Picture image_address='https://i.natgeofe.com/n/e3ae5fbf-ddc9-4b18-8c75-81d2daf962c1/3948225.jpg'
          alt_text="Parrot" />
        <Picture image_address='https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2023/07/top-20-small-dog-breeds.jpeg.jpg'
          alt_text="Dog" />
        <Picture image_address='https://upload.wikimedia.org/wikipedia/commons/9/9e/Ours_brun_parcanimalierpyrenees_1.jpg'
          alt_text="Bear" />
        <Picture image_address='https://cdn.britannica.com/26/162626-050-3534626F/Koala.jpg'
          alt_text="Koala" />
        <Picture image_address='https://hips.hearstapps.com/hmg-prod/images/how-to-keep-ducks-call-ducks-1615457181.jpg?crop=0.669xw:1.00xh;0.166xw,0&resize=1200:*'
          alt_text="Duck" />
        <Picture image_address='https://cdn.vallarta-adventures.com/sites/default/files/2021-08/dolphin-facts.jpg'
          alt_text="Dolphin" />
      </VStack>
    </div>
  )
}
