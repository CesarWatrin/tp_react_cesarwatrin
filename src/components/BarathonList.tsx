import React from 'react';
import styled from 'styled-components';
import { colors } from '../styles/colors';
import { IBarathon, IPub } from '../types/api';
import BarathonThumbnail from './BarathonThumbnail';

interface IProps {
    barathons: IBarathon[];
    pubs: IPub[];
}


const BarathonList = ({barathons, pubs}: IProps): JSX.Element => {
    return (
        <>
            {
                barathons.map((barathon: IBarathon) => {
                    return (
                        <BarathonThumbnail key={barathon._id} barathon={barathon} pubs={pubs}/>
                    );
                })
            }
        </>
    )
};


export default BarathonList;