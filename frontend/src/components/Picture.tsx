import {Box, Image} from "@chakra-ui/react";

interface Props {
  image_address: string;
  alt_text: string;
}

const Picture = ({image_address, alt_text}: Props) => {
  return (
    <Box boxSize='md' overflow='auto' h='full' maxH='100%' borderRadius='5' boxShadow={'lg'}
    _hover={{transition: "transform 0.2s ease-in-out", transform: "scale3d(1.025, 1.025, 1)"}}>
        <Image src={image_address} alt={alt_text}/>
    </Box>
  );
};

export default Picture;
