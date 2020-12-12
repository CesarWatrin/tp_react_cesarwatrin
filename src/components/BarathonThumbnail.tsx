import React, { useState } from 'react';
import styled from 'styled-components';
import Map from './LeafletMap';
import { colors } from '../styles/colors';
import { IBarathon, IPub } from '../types/api';
import Button from './Button';

interface IProps {
    barathon: IBarathon;
    pubs: IPub[];
}

const BarathonThumbnail = ({ barathon, pubs }: IProps): JSX.Element => {

    const selectedPubs = barathon.checkpoints.map((checkpoint: string) => {
        return pubs.find((pub: IPub) =>
            pub._id === checkpoint
        );
    }).filter((pub: IPub) =>  {
        return !!pub;
    }
    );

    const [open, setOpen] = useState<boolean>(false);

    const toggleMap = (): void => {
        setOpen(!open);
    }
    
    const map = () => {
        if (barathon.checkpoints.length !== 0) {
            return (
                <Map keystring = {barathon._id} pubs={selectedPubs} selectedPubs={selectedPubs}/>
            )
        } else {
            return (<Sp>Ce barathon ne contient aucun checkpoint :(</Sp>)
        }
    };

    return (
        <SBarathon>
            <SName>{barathon.name}</SName>
            <SAuthor>by {barathon.author}</SAuthor>
            <Button type='button' onClick={toggleMap}>{open ? 'Hide map': 'Show map'}</Button>
            {open && (map())}
        </SBarathon>
    )

};

const Sp = styled.p`
    color: white;
    font-size: 15px;
`;

const SBarathon = styled.div`
    padding: 15px;
    background-color: ${colors.darkGrey};
    text-align: center;
`;

const SName = styled.div`
    font-size: 22px;
    color: white;
`;

const SAuthor = styled.div`
    font-size: 18px;
    color: ${colors.vibrant};
    padding: 2px;
`;

export default BarathonThumbnail;