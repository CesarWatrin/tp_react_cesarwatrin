import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { colors } from '../styles/colors';
import { IBarathon, IPub } from '../types/api';
import BarathonForm from './BarathonForm';
import BarathonList from './BarathonList';
import Section from './Section';

const App = (): JSX.Element => {
    // Déclaration d'une nouvelle variable d'état interne : pubs
    // RAPPEL: un changement d'état du composant provoque
    //         son re-rendu
    const [pubs, setPubs] = useState<IPub[]>([]);
    const [barathons, setBarathons] = useState<IBarathon[]>([]);

    // fonction executé au montage du composant
    // dans le DOM
    useEffect(() => {
        // obligé d'utiliser une fonction passe-plat pour le code asynchrone
        const fetchPubs = async (): Promise<void> => {
            const response = await fetch('https://miw-server.herokuapp.com/pubs');
            const pubs = await response.json();
            setPubs(pubs);
        };

        const fetchBarathons = async (): Promise<void> => {
            const response = await fetch('https://miw-server.herokuapp.com/barathons');
            const barathons = await response.json();
            setBarathons(barathons);
        }; 

        fetchPubs();
        fetchBarathons();
    }, []);

    return (
        <SContainer>
            <Section>
                <BarathonForm pubs={pubs} />
            </Section>
            <Section>
                <BarathonList pubs={pubs} barathons={barathons}/>
            </Section>
        </SContainer>
    );
};

const SContainer = styled.div`
    background-color: ${colors.darkGrey};
    width: 100%;
    padding: 15px;
`;

export default App;