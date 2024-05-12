import { Box, Center, Flex, Image, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { CollectionType, JewelryType } from '../components/collections/Collections';

type Project = {
    id: number;
    image: string | undefined;
    material: 'Plastic' | 'Resin' | 'Metal' | 'Create from scratch';
    price: number | 'TBA';
    url: string;
    collection: CollectionType;
    jewelry: JewelryType;
};

export const projects: Project[] = [
    {
        id: 1,
        material: 'Metal',
        price: 12.38,
        image: `${process.env.PUBLIC_URL}/images/collections/lissajous/lissajeRing1.jpg`,
        collection: CollectionType.Lissajous,
        jewelry: JewelryType.Ring,
        url: 'eyJzbGlkZXJQYXJhbWV0ZXJzIjp7ImEiOjEsImIiOjMsInNjYWxlQiI6NC4xLCJyIjowLjV9LCJzbGlkZXJNaW5QYXJhbWV0ZXJzIjp7ImEiOjEsImIiOjEsInNjYWxlQiI6MywiciI6MC41fSwic3dpdGNoUGFyYW1ldGVycyI6e30sImRyb3Bkb3duUGFyYW1ldGVycyI6eyJzY2FsZUEiOnsidmFsdWUiOjQzLCJkaWFtZXRlciI6MTMuNn19LCJjdXJyZW50Q29sbGVjdGlvbiI6Imxpc3NhamUiLCJjdXJyZW50SmV3ZWxyeVR5cGUiOiJyaW5nIiwiY3VycmVudE1hdGVyaWFsIjp7Im5hbWUiOiJNZXRhbCIsInRoaWNrbmVzc01pbmltdW0iOjAuNSwiYWRkaXRpb25hbENvc3QiOjAuMzE0Nywicm91Z2huZXNzIjowLjMsIm1ldGFsbmVzcyI6MX0sIm1lc2hDb2xvciI6Imdob3N0d2hpdGUifQ==',
    },
    {
        id: 2,
        material: 'Plastic',
        price: 0.01,
        image: `${process.env.PUBLIC_URL}/images/collections/lissajous/lissajeRing2.jpg`,
        collection: CollectionType.Lissajous,
        jewelry: JewelryType.Ring,
        url: 'eyJzbGlkZXJQYXJhbWV0ZXJzIjp7ImEiOjIsImIiOjEsInNjYWxlQiI6Ni4yLCJyIjowLjc1fSwic2xpZGVyTWluUGFyYW1ldGVycyI6eyJhIjoxLCJiIjoxLCJzY2FsZUIiOjMsInIiOjAuNzUsIm1pbm9yUiI6MC43NX0sInN3aXRjaFBhcmFtZXRlcnMiOnt9LCJkcm9wZG93blBhcmFtZXRlcnMiOnsic2NhbGVBIjp7InZhbHVlIjo0MywiZGlhbWV0ZXIiOjEzLjZ9fSwiY3VycmVudENvbGxlY3Rpb24iOiJsaXNzYWplIiwiY3VycmVudEpld2VscnlUeXBlIjoicmluZyIsImN1cnJlbnRNYXRlcmlhbCI6eyJuYW1lIjoiUGxhc3RpYyIsInRoaWNrbmVzc01pbmltdW0iOjAuNzUsImFkZGl0aW9uYWxDb3N0IjowLjAwMDAzMTI1LCJyb3VnaG5lc3MiOjAuOCwibWV0YWxuZXNzIjowfSwibWVzaENvbG9yIjoicGluayJ9',
    },
    {
        id: 3,
        material: 'Metal',
        price: 21.04,
        image: `${process.env.PUBLIC_URL}/images/collections/torsion/torsionRing1.jpg`,
        collection: CollectionType.Torsion,
        jewelry: JewelryType.Ring,
        url: 'eyJzbGlkZXJQYXJhbWV0ZXJzIjp7InNjYWxlQyI6MSwibWlub3JSIjoxLCJpbmZsYXRlIjoxLCJ0d2lzdCI6MX0sInNsaWRlck1pblBhcmFtZXRlcnMiOnsic2NhbGVDIjoxLCJtaW5vclIiOjAuNzUsImluZmxhdGUiOjAsInR3aXN0IjotNSwiciI6MC41fSwic3dpdGNoUGFyYW1ldGVycyI6eyJ0d2lzdEFsbCI6ZmFsc2V9LCJkcm9wZG93blBhcmFtZXRlcnMiOnsibWFqb3JSIjp7InZhbHVlIjo0MywiZGlhbWV0ZXIiOjEzLjZ9fSwiY3VycmVudENvbGxlY3Rpb24iOiJ0b3JzaW9uIiwiY3VycmVudEpld2VscnlUeXBlIjoicmluZyIsImN1cnJlbnRNYXRlcmlhbCI6eyJuYW1lIjoiTWV0YWwiLCJ0aGlja25lc3NNaW5pbXVtIjowLjUsImFkZGl0aW9uYWxDb3N0IjowLjMxNDcsInJvdWdobmVzcyI6MC4zLCJtZXRhbG5lc3MiOjF9LCJtZXNoQ29sb3IiOiJsaWdodGdyZWVuIn0=',
    },
    {
        id: 4,
        material: 'Plastic',
        price: 0.01,
        image: `${process.env.PUBLIC_URL}/images/collections/torsion/torsionRing2.jpg`,
        collection: CollectionType.Torsion,
        jewelry: JewelryType.Ring,
        url: 'eyJzbGlkZXJQYXJhbWV0ZXJzIjp7InNjYWxlQyI6Mi44LCJtaW5vclIiOjEuMiwiaW5mbGF0ZSI6MSwidHdpc3QiOi0yLjV9LCJzbGlkZXJNaW5QYXJhbWV0ZXJzIjp7InNjYWxlQyI6MSwibWlub3JSIjowLjc1LCJpbmZsYXRlIjowLCJ0d2lzdCI6LTUsInIiOjAuNzV9LCJzd2l0Y2hQYXJhbWV0ZXJzIjp7InR3aXN0QWxsIjp0cnVlfSwiZHJvcGRvd25QYXJhbWV0ZXJzIjp7Im1ham9yUiI6eyJ2YWx1ZSI6NDMsImRpYW1ldGVyIjoxMy42fX0sImN1cnJlbnRDb2xsZWN0aW9uIjoidG9yc2lvbiIsImN1cnJlbnRKZXdlbHJ5VHlwZSI6InJpbmciLCJjdXJyZW50TWF0ZXJpYWwiOnsibmFtZSI6IlBsYXN0aWMiLCJ0aGlja25lc3NNaW5pbXVtIjowLjc1LCJhZGRpdGlvbmFsQ29zdCI6MC4wMDAwMzEyNSwicm91Z2huZXNzIjowLjgsIm1ldGFsbmVzcyI6MH0sIm1lc2hDb2xvciI6Imdob3N0d2hpdGUifQ==',
    },
    {
        id: 5,
        material: 'Metal',
        price: 95.11,
        image: `${process.env.PUBLIC_URL}/images/collections/lissajous/lissajeBracelet1.jpg`,
        collection: CollectionType.Lissajous,
        jewelry: JewelryType.Bracelet,
        url: 'eyJzbGlkZXJQYXJhbWV0ZXJzIjp7ImEiOjIsImIiOjQsInNjYWxlQiI6MTMsInIiOjAuNX0sInNsaWRlck1pblBhcmFtZXRlcnMiOnsiYSI6MSwiYiI6MSwic2NhbGVCIjo4LCJyIjowLjV9LCJzd2l0Y2hQYXJhbWV0ZXJzIjp7fSwiZHJvcGRvd25QYXJhbWV0ZXJzIjp7InNjYWxlQSI6eyJ2YWx1ZSI6MTYwLCJkaWFtZXRlciI6MjUuNX19LCJjdXJyZW50Q29sbGVjdGlvbiI6Imxpc3NhamUiLCJjdXJyZW50SmV3ZWxyeVR5cGUiOiJicmFjZWxldCIsImN1cnJlbnRNYXRlcmlhbCI6eyJuYW1lIjoiTWV0YWwiLCJ0aGlja25lc3NNaW5pbXVtIjowLjUsImFkZGl0aW9uYWxDb3N0IjowLjMxNDcsInJvdWdobmVzcyI6MC4zLCJtZXRhbG5lc3MiOjF9LCJtZXNoQ29sb3IiOiJnb2xkIn0=',
    },
    {
        id: 6,
        material: 'Plastic',
        price: 0.01,
        image: `${process.env.PUBLIC_URL}/images/collections/lissajous/lissajeBracelet2.jpg`,
        collection: CollectionType.Lissajous,
        jewelry: JewelryType.Bracelet,
        url: 'eyJzbGlkZXJQYXJhbWV0ZXJzIjp7ImEiOjEsImIiOjEsInNjYWxlQiI6OCwiciI6MC43NX0sInNsaWRlck1pblBhcmFtZXRlcnMiOnsiYSI6MSwiYiI6MSwic2NhbGVCIjo4LCJyIjowLjc1LCJtaW5vclIiOjAuNzV9LCJzd2l0Y2hQYXJhbWV0ZXJzIjp7fSwiZHJvcGRvd25QYXJhbWV0ZXJzIjp7InNjYWxlQSI6eyJ2YWx1ZSI6MTYwLCJkaWFtZXRlciI6MjUuNX19LCJjdXJyZW50Q29sbGVjdGlvbiI6Imxpc3NhamUiLCJjdXJyZW50SmV3ZWxyeVR5cGUiOiJicmFjZWxldCIsImN1cnJlbnRNYXRlcmlhbCI6eyJuYW1lIjoiUGxhc3RpYyIsInRoaWNrbmVzc01pbmltdW0iOjAuNzUsImFkZGl0aW9uYWxDb3N0IjowLjAwMDAzMTI1LCJyb3VnaG5lc3MiOjAuOCwibWV0YWxuZXNzIjowfSwibWVzaENvbG9yIjoibGlnaHRncmVlbiJ9',
    },
    {
        id: 7,
        material: 'Plastic',
        price: 0.01,
        image: `${process.env.PUBLIC_URL}/images/collections/torsion/torsionBracelet1.jpg`,
        collection: CollectionType.Torsion,
        jewelry: JewelryType.Bracelet,
        url: 'eyJzbGlkZXJQYXJhbWV0ZXJzIjp7InNjYWxlQyI6MywibWlub3JSIjoxLjUsInNjcmV3Ijo0LjksInR3aXN0IjoyLjV9LCJzbGlkZXJNaW5QYXJhbWV0ZXJzIjp7InNjYWxlQyI6MywibWlub3JSIjowLjc1LCJzY3JldyI6MCwidHdpc3QiOi01LCJyIjowLjc1fSwic3dpdGNoUGFyYW1ldGVycyI6eyJ0d2lzdEFsbCI6dHJ1ZX0sImRyb3Bkb3duUGFyYW1ldGVycyI6eyJtYWpvclIiOnsidmFsdWUiOjE2MCwiZGlhbWV0ZXIiOjI1LjV9fSwiY3VycmVudENvbGxlY3Rpb24iOiJ0b3JzaW9uIiwiY3VycmVudEpld2VscnlUeXBlIjoiYnJhY2VsZXQiLCJjdXJyZW50TWF0ZXJpYWwiOnsibmFtZSI6IlBsYXN0aWMiLCJ0aGlja25lc3NNaW5pbXVtIjowLjc1LCJhZGRpdGlvbmFsQ29zdCI6MC4wMDAwMzEyNSwicm91Z2huZXNzIjowLjgsIm1ldGFsbmVzcyI6MH0sIm1lc2hDb2xvciI6ImxpZ2h0c2t5Ymx1ZSJ9',
    },
    {
        id: 8,
        material: 'Metal',
        price: 129.88,
        image: `${process.env.PUBLIC_URL}/images/collections/torsion/torsionBracelet2.jpg`,
        collection: CollectionType.Torsion,
        jewelry: JewelryType.Bracelet,
        url: 'eyJzbGlkZXJQYXJhbWV0ZXJzIjp7InNjYWxlQyI6NS4yLCJtaW5vclIiOjEuMiwic2NyZXciOjAsInR3aXN0IjotMn0sInNsaWRlck1pblBhcmFtZXRlcnMiOnsic2NhbGVDIjozLCJtaW5vclIiOjAuNzUsInNjcmV3IjowLCJ0d2lzdCI6LTUsInIiOjAuNX0sInN3aXRjaFBhcmFtZXRlcnMiOnsidHdpc3RBbGwiOmZhbHNlfSwiZHJvcGRvd25QYXJhbWV0ZXJzIjp7Im1ham9yUiI6eyJ2YWx1ZSI6MTYwLCJkaWFtZXRlciI6MjUuNX19LCJjdXJyZW50Q29sbGVjdGlvbiI6InRvcnNpb24iLCJjdXJyZW50SmV3ZWxyeVR5cGUiOiJicmFjZWxldCIsImN1cnJlbnRNYXRlcmlhbCI6eyJuYW1lIjoiTWV0YWwiLCJ0aGlja25lc3NNaW5pbXVtIjowLjUsImFkZGl0aW9uYWxDb3N0IjowLjMxNDcsInJvdWdobmVzcyI6MC4zLCJtZXRhbG5lc3MiOjF9LCJtZXNoQ29sb3IiOiJnb2xkIn0=',
    },
    {
        id: 9,
        material: 'Metal',
        price: 26.71,
        image: `${process.env.PUBLIC_URL}/images/collections/lissajous/lissajeEarring1.jpg`,
        collection: CollectionType.Lissajous,
        jewelry: JewelryType.Earring,
        url: 'eyJzbGlkZXJQYXJhbWV0ZXJzIjp7ImEiOjUsImMiOjEsImIiOjUsInNjYWxlQSI6NSwic2NhbGVCIjo3LCJzY2FsZUMiOjEyLCJyIjowLjV9LCJzbGlkZXJNaW5QYXJhbWV0ZXJzIjp7ImEiOjIsImMiOjEsImIiOjEsInNjYWxlQSI6NSwic2NhbGVCIjo1LCJzY2FsZUMiOjEwLCJyIjowLjV9LCJzd2l0Y2hQYXJhbWV0ZXJzIjp7fSwiZHJvcGRvd25QYXJhbWV0ZXJzIjp7fSwiY3VycmVudENvbGxlY3Rpb24iOiJsaXNzYWplIiwiY3VycmVudEpld2VscnlUeXBlIjoiZWFycmluZyIsImN1cnJlbnRNYXRlcmlhbCI6eyJuYW1lIjoiTWV0YWwiLCJ0aGlja25lc3NNaW5pbXVtIjowLjUsImFkZGl0aW9uYWxDb3N0IjowLjMxNDcsInJvdWdobmVzcyI6MC4zLCJtZXRhbG5lc3MiOjF9LCJtZXNoQ29sb3IiOiJsaWdodHNreWJsdWUifQ==',
    },
    {
        id: 10,
        material: 'Resin',
        price: 0.01,
        image: `${process.env.PUBLIC_URL}/images/collections/lissajous/lissajeEarring2.jpg`,
        collection: CollectionType.Lissajous,
        jewelry: JewelryType.Earring,
        url: 'eyJzbGlkZXJQYXJhbWV0ZXJzIjp7ImEiOjMsImMiOjIsImIiOjEsInNjYWxlQSI6NSwic2NhbGVCIjo1LCJzY2FsZUMiOjEwLCJyIjowLjV9LCJzbGlkZXJNaW5QYXJhbWV0ZXJzIjp7ImEiOjIsImMiOjEsImIiOjEsInNjYWxlQSI6NSwic2NhbGVCIjo1LCJzY2FsZUMiOjEwLCJyIjoxfSwic3dpdGNoUGFyYW1ldGVycyI6e30sImRyb3Bkb3duUGFyYW1ldGVycyI6e30sImN1cnJlbnRDb2xsZWN0aW9uIjoibGlzc2FqZSIsImN1cnJlbnRKZXdlbHJ5VHlwZSI6ImVhcnJpbmciLCJjdXJyZW50TWF0ZXJpYWwiOnsibmFtZSI6IlJlc2luIiwidGhpY2tuZXNzTWluaW11bSI6MSwiYWRkaXRpb25hbENvc3QiOjAuMDAwMDMzMywicm91Z2huZXNzIjoxLCJtZXRhbG5lc3MiOjAuNX0sIm1lc2hDb2xvciI6ImdvbGQifQ==',
    },
    {
        id: 11,
        material: 'Resin',
        price: 0.01,
        image: `${process.env.PUBLIC_URL}/images/collections/torsion/torsionEarring1.jpg`,
        collection: CollectionType.Torsion,
        jewelry: JewelryType.Earring,
        url: 'eyJzbGlkZXJQYXJhbWV0ZXJzIjp7Im1ham9yUiI6NS4zLCJtaW5vclIiOjAuNzUsImluZmxhdGUiOjAuNSwidHdpc3QiOjEsInNjYWxlQyI6MS40fSwic2xpZGVyTWluUGFyYW1ldGVycyI6eyJtYWpvclIiOjUsIm1pbm9yUiI6MC43NSwiaW5mbGF0ZSI6MCwidHdpc3QiOi01LCJzY2FsZUMiOjEsInIiOjF9LCJzd2l0Y2hQYXJhbWV0ZXJzIjp7InR3aXN0QWxsIjp0cnVlfSwiZHJvcGRvd25QYXJhbWV0ZXJzIjp7fSwiY3VycmVudENvbGxlY3Rpb24iOiJ0b3JzaW9uIiwiY3VycmVudEpld2VscnlUeXBlIjoiZWFycmluZyIsImN1cnJlbnRNYXRlcmlhbCI6eyJuYW1lIjoiUmVzaW4iLCJ0aGlja25lc3NNaW5pbXVtIjoxLCJhZGRpdGlvbmFsQ29zdCI6MC4wMDAwMzMzLCJyb3VnaG5lc3MiOjEsIm1ldGFsbmVzcyI6MC41fSwibWVzaENvbG9yIjoicGluayJ9',
    },
    {
        id: 12,
        material: 'Plastic',
        price: 0.01,
        image: `${process.env.PUBLIC_URL}/images/collections/torsion/torsionEarring2.jpg`,
        collection: CollectionType.Torsion,
        jewelry: JewelryType.Earring,
        url: 'eyJzbGlkZXJQYXJhbWV0ZXJzIjp7Im1ham9yUiI6OC41LCJtaW5vclIiOjEuMSwiaW5mbGF0ZSI6MC41LCJ0d2lzdCI6LTEuNSwic2NhbGVDIjoyfSwic2xpZGVyTWluUGFyYW1ldGVycyI6eyJtYWpvclIiOjUsIm1pbm9yUiI6MC43NSwiaW5mbGF0ZSI6MCwidHdpc3QiOi01LCJzY2FsZUMiOjEsInIiOjAuNzV9LCJzd2l0Y2hQYXJhbWV0ZXJzIjp7InR3aXN0QWxsIjpmYWxzZX0sImRyb3Bkb3duUGFyYW1ldGVycyI6e30sImN1cnJlbnRDb2xsZWN0aW9uIjoidG9yc2lvbiIsImN1cnJlbnRKZXdlbHJ5VHlwZSI6ImVhcnJpbmciLCJjdXJyZW50TWF0ZXJpYWwiOnsibmFtZSI6IlBsYXN0aWMiLCJ0aGlja25lc3NNaW5pbXVtIjowLjc1LCJhZGRpdGlvbmFsQ29zdCI6MC4wMDAwMzEyNSwicm91Z2huZXNzIjowLjgsIm1ldGFsbmVzcyI6MH0sIm1lc2hDb2xvciI6ImxpZ2h0Z3JlZW4ifQ==',
    },
    {
        id: 13,
        material: 'Resin',
        price: 0.01,
        image: `${process.env.PUBLIC_URL}/images/collections/lissajous/lissajePendant1.jpg`,
        collection: CollectionType.Lissajous,
        jewelry: JewelryType.Pendant,
        url: 'eyJzbGlkZXJQYXJhbWV0ZXJzIjp7ImEiOjEsImIiOjMsInNjYWxlQiI6MTAsInNjYWxlQSI6MTAsInIiOjAuNzV9LCJzbGlkZXJNaW5QYXJhbWV0ZXJzIjp7ImEiOjEsImIiOjEsInNjYWxlQiI6MTAsInNjYWxlQSI6MTAsInIiOjAuNzV9LCJzd2l0Y2hQYXJhbWV0ZXJzIjp7fSwiZHJvcGRvd25QYXJhbWV0ZXJzIjp7fSwiY3VycmVudENvbGxlY3Rpb24iOiJsaXNzYWplIiwiY3VycmVudEpld2VscnlUeXBlIjoicGVuZGFudCIsImN1cnJlbnRNYXRlcmlhbCI6eyJuYW1lIjoiUmVzaW4iLCJ0aGlja25lc3NNaW5pbXVtIjoxLCJhZGRpdGlvbmFsQ29zdCI6MC4wMDAwMzMzLCJyb3VnaG5lc3MiOjEsIm1ldGFsbmVzcyI6MC41fSwibWVzaENvbG9yIjoibGlnaHRza3libHVlIn0=',
    },
    {
        id: 14,
        material: 'Metal',
        price: 8.27,
        image: `${process.env.PUBLIC_URL}/images/collections/lissajous/lissajePendant2.jpg`,
        collection: CollectionType.Lissajous,
        jewelry: JewelryType.Pendant,
        url: 'eyJzbGlkZXJQYXJhbWV0ZXJzIjp7ImEiOjEsImIiOjEsInNjYWxlQiI6MTAsInNjYWxlQSI6MTAsInIiOjAuNX0sInNsaWRlck1pblBhcmFtZXRlcnMiOnsiYSI6MSwiYiI6MSwic2NhbGVCIjoxMCwic2NhbGVBIjoxMCwiciI6MC41fSwic3dpdGNoUGFyYW1ldGVycyI6e30sImRyb3Bkb3duUGFyYW1ldGVycyI6e30sImN1cnJlbnRDb2xsZWN0aW9uIjoibGlzc2FqZSIsImN1cnJlbnRKZXdlbHJ5VHlwZSI6InBlbmRhbnQiLCJjdXJyZW50TWF0ZXJpYWwiOnsibmFtZSI6Ik1ldGFsIiwidGhpY2tuZXNzTWluaW11bSI6MC41LCJhZGRpdGlvbmFsQ29zdCI6MC4zMTQ3LCJyb3VnaG5lc3MiOjAuMywibWV0YWxuZXNzIjoxfSwibWVzaENvbG9yIjoicGluayJ9',
    },
    {
        id: 15,
        material: 'Metal',
        price: 4.06,
        image: `${process.env.PUBLIC_URL}/images/collections/torsion/torsionPendant1.jpg`,
        collection: CollectionType.Torsion,
        jewelry: JewelryType.Pendant,
        url: 'eyJzbGlkZXJQYXJhbWV0ZXJzIjp7Im1ham9yUiI6My4zLCJtaW5vclIiOjEuMSwic2NhbGVDIjoxLCJ0d2lzdCI6MH0sInNsaWRlck1pblBhcmFtZXRlcnMiOnsibWFqb3JSIjozLCJtaW5vclIiOjAuNzUsInNjYWxlQyI6MSwidHdpc3QiOi01LCJyIjowLjV9LCJzd2l0Y2hQYXJhbWV0ZXJzIjp7InR3aXN0QWxsIjpmYWxzZX0sImRyb3Bkb3duUGFyYW1ldGVycyI6e30sImN1cnJlbnRDb2xsZWN0aW9uIjoidG9yc2lvbiIsImN1cnJlbnRKZXdlbHJ5VHlwZSI6InBlbmRhbnQiLCJjdXJyZW50TWF0ZXJpYWwiOnsibmFtZSI6Ik1ldGFsIiwidGhpY2tuZXNzTWluaW11bSI6MC41LCJhZGRpdGlvbmFsQ29zdCI6MC4zMTQ3LCJyb3VnaG5lc3MiOjAuMywibWV0YWxuZXNzIjoxfSwibWVzaENvbG9yIjoibGlnaHRza3libHVlIn0=',
    },
    {
        id: 16,
        material: 'Resin',
        price: 0.01,
        image: `${process.env.PUBLIC_URL}/images/collections/torsion/torsionPendant2.jpg`,
        collection: CollectionType.Torsion,
        jewelry: JewelryType.Pendant,
        url: 'eyJzbGlkZXJQYXJhbWV0ZXJzIjp7Im1ham9yUiI6NS44LCJtaW5vclIiOjIsInNjYWxlQyI6MSwidHdpc3QiOjF9LCJzbGlkZXJNaW5QYXJhbWV0ZXJzIjp7Im1ham9yUiI6MywibWlub3JSIjowLjc1LCJzY2FsZUMiOjEsInR3aXN0IjotNSwiciI6MX0sInN3aXRjaFBhcmFtZXRlcnMiOnsidHdpc3RBbGwiOnRydWV9LCJkcm9wZG93blBhcmFtZXRlcnMiOnt9LCJjdXJyZW50Q29sbGVjdGlvbiI6InRvcnNpb24iLCJjdXJyZW50SmV3ZWxyeVR5cGUiOiJwZW5kYW50IiwiY3VycmVudE1hdGVyaWFsIjp7Im5hbWUiOiJSZXNpbiIsInRoaWNrbmVzc01pbmltdW0iOjEsImFkZGl0aW9uYWxDb3N0IjowLjAwMDAzMzMsInJvdWdobmVzcyI6MSwibWV0YWxuZXNzIjowLjV9LCJtZXNoQ29sb3IiOiJnaG9zdHdoaXRlIn0=',
    },
    {
        id: 17,
        material: 'Create from scratch',
        price: 'TBA',
        image: undefined,
        collection: CollectionType.Lissajous,
        jewelry: JewelryType.Ring,
        url: 'eyJzbGlkZXJQYXJhbWV0ZXJzIjp7ImEiOjEsImIiOjIsInNjYWxlQiI6NS41LCJyIjowLjV9LCJzbGlkZXJNaW5QYXJhbWV0ZXJzIjp7ImEiOjEsImIiOjEsInNjYWxlQiI6MywiciI6MC43NSwibWlub3JSIjowLjc1fSwic3dpdGNoUGFyYW1ldGVycyI6e30sImRyb3Bkb3duUGFyYW1ldGVycyI6eyJzY2FsZUEiOnsidmFsdWUiOjQzLCJkaWFtZXRlciI6MTMuNn19LCJjdXJyZW50Q29sbGVjdGlvbiI6Imxpc3NhamUiLCJjdXJyZW50SmV3ZWxyeVR5cGUiOiJyaW5nIiwiY3VycmVudE1hdGVyaWFsIjp7Im5hbWUiOiJQbGFzdGljIiwidGhpY2tuZXNzTWluaW11bSI6MC43NSwiYWRkaXRpb25hbENvc3QiOjAuMDAwMDMxMjUsInJvdWdobmVzcyI6MC44LCJtZXRhbG5lc3MiOjB9LCJtZXNoQ29sb3IiOiJnaG9zdHdoaXRlIn0=',
    },
    {
        id: 18,
        material: 'Create from scratch',
        price: 'TBA',
        image: undefined,
        collection: CollectionType.Torsion,
        jewelry: JewelryType.Ring,
        url: 'eyJzbGlkZXJQYXJhbWV0ZXJzIjp7InNjYWxlQyI6MS42LCJtaW5vclIiOjAuOSwiaW5mbGF0ZSI6MC4yLCJ0d2lzdCI6LTF9LCJzbGlkZXJNaW5QYXJhbWV0ZXJzIjp7InNjYWxlQyI6MSwibWlub3JSIjowLjc1LCJpbmZsYXRlIjowLCJ0d2lzdCI6LTUsInIiOjAuNzV9LCJzd2l0Y2hQYXJhbWV0ZXJzIjp7InR3aXN0QWxsIjpmYWxzZX0sImRyb3Bkb3duUGFyYW1ldGVycyI6eyJtYWpvclIiOnsidmFsdWUiOjQzLCJkaWFtZXRlciI6MTMuNn19LCJjdXJyZW50Q29sbGVjdGlvbiI6InRvcnNpb24iLCJjdXJyZW50SmV3ZWxyeVR5cGUiOiJyaW5nIiwiY3VycmVudE1hdGVyaWFsIjp7Im5hbWUiOiJQbGFzdGljIiwidGhpY2tuZXNzTWluaW11bSI6MC43NSwiYWRkaXRpb25hbENvc3QiOjAuMDAwMDMxMjUsInJvdWdobmVzcyI6MC44LCJtZXRhbG5lc3MiOjB9LCJtZXNoQ29sb3IiOiJnaG9zdHdoaXRlIn0=',
    },
    {
        id: 19,
        material: 'Create from scratch',
        price: 'TBA',
        image: undefined,
        collection: CollectionType.Lissajous,
        jewelry: JewelryType.Bracelet,
        url: 'eyJzbGlkZXJQYXJhbWV0ZXJzIjp7ImEiOjMsImIiOjMsInNjYWxlQiI6OCwiciI6MC43NX0sInNsaWRlck1pblBhcmFtZXRlcnMiOnsiYSI6MSwiYiI6MSwic2NhbGVCIjo4LCJyIjowLjc1LCJtaW5vclIiOjAuNzV9LCJzd2l0Y2hQYXJhbWV0ZXJzIjp7fSwiZHJvcGRvd25QYXJhbWV0ZXJzIjp7InNjYWxlQSI6eyJ2YWx1ZSI6MTYwLCJkaWFtZXRlciI6MjUuNX19LCJjdXJyZW50Q29sbGVjdGlvbiI6Imxpc3NhamUiLCJjdXJyZW50SmV3ZWxyeVR5cGUiOiJicmFjZWxldCIsImN1cnJlbnRNYXRlcmlhbCI6eyJuYW1lIjoiUGxhc3RpYyIsInRoaWNrbmVzc01pbmltdW0iOjAuNzUsImFkZGl0aW9uYWxDb3N0IjowLjAwMDAzMTI1LCJyb3VnaG5lc3MiOjAuOCwibWV0YWxuZXNzIjowfSwibWVzaENvbG9yIjoiZ2hvc3R3aGl0ZSJ9',
    },
    {
        id: 20,
        material: 'Create from scratch',
        price: 'TBA',
        image: undefined,
        collection: CollectionType.Torsion,
        jewelry: JewelryType.Bracelet,
        url: 'eyJzbGlkZXJQYXJhbWV0ZXJzIjp7InNjYWxlQyI6NC4xLCJtaW5vclIiOjEsInNjcmV3IjowLCJ0d2lzdCI6MX0sInNsaWRlck1pblBhcmFtZXRlcnMiOnsic2NhbGVDIjozLCJtaW5vclIiOjAuNzUsInNjcmV3IjowLCJ0d2lzdCI6LTUsInIiOjAuNzV9LCJzd2l0Y2hQYXJhbWV0ZXJzIjp7InR3aXN0QWxsIjp0cnVlfSwiZHJvcGRvd25QYXJhbWV0ZXJzIjp7Im1ham9yUiI6eyJ2YWx1ZSI6MTYwLCJkaWFtZXRlciI6MjUuNX19LCJjdXJyZW50Q29sbGVjdGlvbiI6InRvcnNpb24iLCJjdXJyZW50SmV3ZWxyeVR5cGUiOiJicmFjZWxldCIsImN1cnJlbnRNYXRlcmlhbCI6eyJuYW1lIjoiUGxhc3RpYyIsInRoaWNrbmVzc01pbmltdW0iOjAuNzUsImFkZGl0aW9uYWxDb3N0IjowLjAwMDAzMTI1LCJyb3VnaG5lc3MiOjAuOCwibWV0YWxuZXNzIjowfSwibWVzaENvbG9yIjoiZ2hvc3R3aGl0ZSJ9',
    },
    {
        id: 21,
        material: 'Create from scratch',
        price: 'TBA',
        image: undefined,
        collection: CollectionType.Lissajous,
        jewelry: JewelryType.Earring,
        url: 'eyJzbGlkZXJQYXJhbWV0ZXJzIjp7ImEiOjIsImMiOjEsImIiOjEsInNjYWxlQSI6NSwic2NhbGVCIjo1LCJzY2FsZUMiOjEyLCJyIjowLjV9LCJzbGlkZXJNaW5QYXJhbWV0ZXJzIjp7ImEiOjIsImMiOjEsImIiOjEsInNjYWxlQSI6NSwic2NhbGVCIjo1LCJzY2FsZUMiOjEwLCJyIjowLjc1LCJtaW5vclIiOjAuNzV9LCJzd2l0Y2hQYXJhbWV0ZXJzIjp7fSwiZHJvcGRvd25QYXJhbWV0ZXJzIjp7fSwiY3VycmVudENvbGxlY3Rpb24iOiJsaXNzYWplIiwiY3VycmVudEpld2VscnlUeXBlIjoiZWFycmluZyIsImN1cnJlbnRNYXRlcmlhbCI6eyJuYW1lIjoiUGxhc3RpYyIsInRoaWNrbmVzc01pbmltdW0iOjAuNzUsImFkZGl0aW9uYWxDb3N0IjowLjAwMDAzMTI1LCJyb3VnaG5lc3MiOjAuOCwibWV0YWxuZXNzIjowfSwibWVzaENvbG9yIjoiZ2hvc3R3aGl0ZSJ9',
    },
    {
        id: 22,
        material: 'Create from scratch',
        price: 'TBA',
        image: undefined,
        collection: CollectionType.Torsion,
        jewelry: JewelryType.Earring,
        url: 'eyJzbGlkZXJQYXJhbWV0ZXJzIjp7Im1ham9yUiI6OC41LCJtaW5vclIiOjEuMSwiaW5mbGF0ZSI6MCwidHdpc3QiOjAsInNjYWxlQyI6Mn0sInNsaWRlck1pblBhcmFtZXRlcnMiOnsibWFqb3JSIjo1LCJtaW5vclIiOjAuNzUsImluZmxhdGUiOjAsInR3aXN0IjotNSwic2NhbGVDIjoxLCJyIjowLjc1fSwic3dpdGNoUGFyYW1ldGVycyI6eyJ0d2lzdEFsbCI6dHJ1ZX0sImRyb3Bkb3duUGFyYW1ldGVycyI6e30sImN1cnJlbnRDb2xsZWN0aW9uIjoidG9yc2lvbiIsImN1cnJlbnRKZXdlbHJ5VHlwZSI6ImVhcnJpbmciLCJjdXJyZW50TWF0ZXJpYWwiOnsibmFtZSI6IlBsYXN0aWMiLCJ0aGlja25lc3NNaW5pbXVtIjowLjc1LCJhZGRpdGlvbmFsQ29zdCI6MC4wMDAwMzEyNSwicm91Z2huZXNzIjowLjgsIm1ldGFsbmVzcyI6MH0sIm1lc2hDb2xvciI6Imdob3N0d2hpdGUifQ==',
    },
    {
        id: 23,
        material: 'Create from scratch',
        price: 'TBA',
        image: undefined,
        collection: CollectionType.Lissajous,
        jewelry: JewelryType.Pendant,
        url: 'eyJzbGlkZXJQYXJhbWV0ZXJzIjp7ImEiOjEsImIiOjEsInNjYWxlQiI6MTAsInNjYWxlQSI6MTMuOCwiciI6MC43NX0sInNsaWRlck1pblBhcmFtZXRlcnMiOnsiYSI6MSwiYiI6MSwic2NhbGVCIjoxMCwic2NhbGVBIjoxMCwiciI6MC43NSwibWlub3JSIjowLjc1fSwic3dpdGNoUGFyYW1ldGVycyI6e30sImRyb3Bkb3duUGFyYW1ldGVycyI6e30sImN1cnJlbnRDb2xsZWN0aW9uIjoibGlzc2FqZSIsImN1cnJlbnRKZXdlbHJ5VHlwZSI6InBlbmRhbnQiLCJjdXJyZW50TWF0ZXJpYWwiOnsibmFtZSI6IlBsYXN0aWMiLCJ0aGlja25lc3NNaW5pbXVtIjowLjc1LCJhZGRpdGlvbmFsQ29zdCI6MC4wMDAwMzEyNSwicm91Z2huZXNzIjowLjgsIm1ldGFsbmVzcyI6MH0sIm1lc2hDb2xvciI6Imdob3N0d2hpdGUifQ==',
    },
    {
        id: 24,
        material: 'Create from scratch',
        price: 'TBA',
        image: undefined,
        collection: CollectionType.Torsion,
        jewelry: JewelryType.Pendant,
        url: 'eyJzbGlkZXJQYXJhbWV0ZXJzIjp7Im1ham9yUiI6NS44LCJtaW5vclIiOjEsInNjYWxlQyI6MSwidHdpc3QiOi0yfSwic2xpZGVyTWluUGFyYW1ldGVycyI6eyJtYWpvclIiOjMsIm1pbm9yUiI6MC43NSwic2NhbGVDIjoxLCJ0d2lzdCI6LTUsInIiOjAuNzV9LCJzd2l0Y2hQYXJhbWV0ZXJzIjp7InR3aXN0QWxsIjp0cnVlfSwiZHJvcGRvd25QYXJhbWV0ZXJzIjp7fSwiY3VycmVudENvbGxlY3Rpb24iOiJ0b3JzaW9uIiwiY3VycmVudEpld2VscnlUeXBlIjoicGVuZGFudCIsImN1cnJlbnRNYXRlcmlhbCI6eyJuYW1lIjoiUGxhc3RpYyIsInRoaWNrbmVzc01pbmltdW0iOjAuNzUsImFkZGl0aW9uYWxDb3N0IjowLjAwMDAzMTI1LCJyb3VnaG5lc3MiOjAuOCwibWV0YWxuZXNzIjowfSwibWVzaENvbG9yIjoiZ2hvc3R3aGl0ZSJ9',
    },
];

export const CreatePage = () => {
    return (
        <Center>
            <Box paddingTop={{ base: 6, sm: 10, md: 12, lg: 16 }} paddingBottom={28}>
                <Stack w="80vw">
                    <Text textStyle={'header1'}>/ Create</Text>
                    <Text maxW="2xl" textStyle={'body'}>
                        Want to create something for yourself or your loved ones? This it the right place!
                        <br />
                        If you like any of the presets below, click on it and you will be able to customize it futher.
                        If not, you can configure whatever jewelry type you want from scratch.
                    </Text>

                    <Tabs defaultIndex={0} variant="unstyled" isFitted>
                        <TabList>
                            {Object.values(JewelryType).map((jewelryValue) => (
                                <Tab
                                    key={jewelryValue}
                                    textStyle={'header3'}
                                    fontSize={{ base: 'xs', sm: 'sm', md: 'md', lg: 'lg' }}
                                    color={'brand.50'}
                                    sx={{
                                        borderBottom: '1px solid #B2B2B2',
                                        _selected: {
                                            borderBottom: '3px solid #1E1E1E',
                                            fontWeight: '500',
                                        },
                                    }}
                                >
                                    {jewelryValue.charAt(0).toUpperCase() + jewelryValue.slice(1) + 's'}
                                </Tab>
                            ))}
                        </TabList>

                        <TabPanels>
                            {Object.values(JewelryType).map((jewelryType) => (
                                <TabPanel key={jewelryType} paddingLeft={0} paddingRight={0}>
                                    {Object.values(CollectionType).map((collectionType) => (
                                        <Box key={jewelryType + collectionType}>
                                            <Text textStyle={'header2'}>
                                                / Collection{' '}
                                                {collectionType.charAt(0).toUpperCase() + collectionType.slice(1)}{' '}
                                            </Text>
                                            <Text color="brand.100" textStyle="body">
                                                {collectionType === CollectionType.Lissajous
                                                    ? 'Based on the Lissajous curves'
                                                    : 'Based on the twists of the torus geometry'}
                                            </Text>

                                            <Flex
                                                paddingTop="2"
                                                paddingBottom="4"
                                                direction="row"
                                                rowGap={4}
                                                columnGap={4}
                                                wrap="wrap"
                                            >
                                                {projects
                                                    .filter((project) => project.jewelry === jewelryType)
                                                    .filter((project) => project.collection === collectionType)
                                                    .map((selectedProject) => (
                                                        <Box
                                                            as={Link}
                                                            to={`/configurator?config=${selectedProject.url}`}
                                                            key={selectedProject.id}
                                                            h={{ base: '52', sm: '56', md: '60', lg: '80' }}
                                                            position="relative"
                                                            borderRadius="sm"
                                                            shadow="lg"
                                                            padding={4}
                                                            bg={'brand.200'}
                                                        >
                                                            {selectedProject.image !== undefined ? (
                                                                <Box
                                                                    _hover={{
                                                                        '.image-overlay': {
                                                                            opacity: 1,
                                                                        },
                                                                    }}
                                                                >
                                                                    <Image
                                                                        w={{ base: '28', sm: '36', md: '40', lg: '60' }}
                                                                        h={{ base: '36', sm: '40', md: '44', lg: '60' }}
                                                                        objectFit="cover"
                                                                        src={selectedProject.image}
                                                                        alt={'Project' + selectedProject.id}
                                                                    />
                                                                    <Box
                                                                        className="image-overlay"
                                                                        position="absolute"
                                                                        top="0"
                                                                        left="0"
                                                                        w="full"
                                                                        h="full"
                                                                        bgGradient="linear-gradient(to top, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5))"
                                                                        opacity="0"
                                                                        transition="opacity 0.3s ease-in-out"
                                                                        zIndex="1"
                                                                    />
                                                                </Box>
                                                            ) : (
                                                                <Text
                                                                    w={{ base: '28', sm: '36', md: '40', lg: '60' }}
                                                                    h={{ base: '36', sm: '40', md: '44', lg: '60' }}
                                                                    paddingTop={10}
                                                                    fontFamily={'heading'}
                                                                    fontSize={{
                                                                        base: '5xl',
                                                                        sm: '6xl',
                                                                        md: '7xl',
                                                                        lg: '8xl',
                                                                    }}
                                                                    fontWeight="300"
                                                                    display="flex"
                                                                    align="center"
                                                                    justifyContent="center"
                                                                    color="brand.100"
                                                                >
                                                                    +
                                                                </Text>
                                                            )}

                                                            <Text textStyle={'subheaderHighlight'}>
                                                                {selectedProject.material}{' '}
                                                                {selectedProject.price === 'TBA'
                                                                    ? ''
                                                                    : selectedProject.jewelry}
                                                            </Text>

                                                            {selectedProject.price === 'TBA' ? (
                                                                <Text textStyle={'body'}>To be priced</Text>
                                                            ) : (
                                                                <Text textStyle={'body'}>
                                                                    Approx. €{selectedProject.price!.toFixed(2)}
                                                                </Text>
                                                            )}
                                                        </Box>
                                                    ))}
                                            </Flex>
                                        </Box>
                                    ))}
                                </TabPanel>
                            ))}
                        </TabPanels>
                    </Tabs>
                </Stack>
            </Box>
        </Center>
    );
};
